/**
 * Eskiz.uz SMS — https://notify.eskiz.uz/api
 * .env: ESKIZ_EMAIL, ESKIZ_PASSWORD, ESKIZ_FROM (kabinetdagi ruxsat etilgan nom)
 *        ESKIZ_SMS_TEMPLATE (ixtiyoriy, {#code#} placeholder bilan)
 */

import { ESKIZ_OTP_SMS_TEMPLATE } from "@/lib/auth-constants";

const NOTIFY_BASE = "https://notify.eskiz.uz/api";

/** Moderatsiyadan o‘tgan shablondan SMS matnini yig‘adi */
export function buildEskizOtpMessage(code: string): string {
  return ESKIZ_OTP_SMS_TEMPLATE.replace(/\{#code#\}/g, code);
}

/** Eskiz xatosini foydalanuvchiga tushunarli qilib qaytaradi */
export function mapEskizErrorForUser(error: string): string {
  const lower = error.toLowerCase();
  if (
    lower.includes("модерац") ||
    lower.includes("moderation") ||
    lower.includes("шаблон") ||
    lower.includes("template")
  ) {
    return "SMS matni hali tasdiqlanmagan. Eskiz kabinetida (my.eskiz.uz → SMS → Mening matnlarim) shablon holatini tekshiring.";
  }
  return error;
}

export type EskizSendResult =
  | { ok: true; skipped?: false }
  | { ok: true; skipped: true; reason: string }
  | { ok: false; error: string };

type JsonRecord = Record<string, unknown>;

function pickToken(body: JsonRecord): string | undefined {
  const data = body.data as JsonRecord | undefined;
  const token =
    (typeof body.token === "string" ? body.token : undefined) ??
    (data && typeof data.token === "string" ? data.token : undefined);
  return token;
}

function describeEskizFailure(prefix: string, status: number, body: unknown) {
  console.error(`[eskiz] ${prefix} HTTP ${status}`, JSON.stringify(body));
}

/** Login: avvalo JSON (yangi kabinetlar), keyin form-urlencoded */
async function eskizGetToken(): Promise<{ token: string } | { error: string }> {
  const email = process.env.ESKIZ_EMAIL;
  const password = process.env.ESKIZ_PASSWORD;
  if (!email || !password) {
    return { error: "Eskiz login ma’lumotlari yo‘q" };
  }

  const jsonRes = await fetch(`${NOTIFY_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, password }),
  });

  let jsonBody: JsonRecord = {};
  try {
    jsonBody = (await jsonRes.json()) as JsonRecord;
  } catch {
    jsonBody = {};
  }

  let token = pickToken(jsonBody);
  if (token) {
    return { token };
  }

  const formBody = new URLSearchParams();
  formBody.set("email", email);
  formBody.set("password", password);

  const formRes = await fetch(`${NOTIFY_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: formBody.toString(),
  });

  let formJson: JsonRecord = {};
  try {
    formJson = (await formRes.json()) as JsonRecord;
  } catch {
    formJson = {};
  }

  token = pickToken(formJson);
  if (token) {
    return { token };
  }

  const msg =
    (typeof jsonBody.message === "string" && jsonBody.message) ||
    (typeof formJson.message === "string" && formJson.message) ||
    "Eskiz login rad etildi (email/parol yoki API format)";

  describeEskizFailure("login", jsonRes.ok ? formRes.status : jsonRes.status, {
    jsonTry: jsonBody,
    formTry: formJson,
  });

  return { error: msg };
}

/** SMS API ba’zan 200 qaytaradi, xato matni body.message da bo‘lishi mumkin */
function isSmsSendSuccess(status: number, body: JsonRecord): boolean {
  if (status < 200 || status >= 300) return false;

  if (body.success === false || body.status === "error") return false;

  const raw = body.message;
  if (typeof raw === "string") {
    const m = raw.toLowerCase();
    if (
      m.includes("unauthorized") ||
      m.includes("invalid token") ||
      (m.includes("balance") && m.includes("insufficient")) ||
      (m.includes("balans") && (m.includes("yetmaydi") || m.includes("kam")))
    ) {
      return false;
    }
  }

  return true;
}

export async function sendEskizSms(
  mobile998: string,
  message: string,
): Promise<EskizSendResult> {
  const from = process.env.ESKIZ_FROM?.trim();

  if (!process.env.ESKIZ_EMAIL || !process.env.ESKIZ_PASSWORD) {
    console.warn(
      "[eskiz] ESKIZ_EMAIL / ESKIZ_PASSWORD yo‘q — SMS yuborilmadi (faqat dev).",
    );
    return { ok: true, skipped: true, reason: "missing_credentials" };
  }

  try {
    const auth = await eskizGetToken();
    if ("error" in auth) {
      return { ok: false, error: auth.error };
    }

    const token = auth.token;

    const payload: Record<string, string> = {
      mobile_phone: mobile998,
      message,
    };
    if (from) {
      payload.from = from;
    }

    const sendJson = async () => {
      const res = await fetch(`${NOTIFY_BASE}/message/sms/send`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      let body: JsonRecord = {};
      try {
        body = (await res.json()) as JsonRecord;
      } catch {
        body = {};
      }
      return { res, body };
    };

    const sendForm = async () => {
      const form = new URLSearchParams();
      form.set("mobile_phone", mobile998);
      form.set("message", message);
      if (from) form.set("from", from);

      const res = await fetch(`${NOTIFY_BASE}/message/sms/send`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: form.toString(),
      });
      let body: JsonRecord = {};
      try {
        body = (await res.json()) as JsonRecord;
      } catch {
        body = {};
      }
      return { res, body };
    };

    let { res: smsRes, body: smsJson } = await sendJson();

    if (!isSmsSendSuccess(smsRes.status, smsJson)) {
      const fallback = await sendForm();
      smsRes = fallback.res;
      smsJson = fallback.body;
    }

    const ok = isSmsSendSuccess(smsRes.status, smsJson);

    if (!ok) {
      describeEskizFailure("sms/send", smsRes.status, smsJson);
      const errText =
        (typeof smsJson.message === "string" && smsJson.message) ||
        (typeof smsJson.error === "string" && smsJson.error) ||
        `SMS rad etildi (HTTP ${smsRes.status})`;
      return { ok: false, error: errText };
    }

    return { ok: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Tarmoq xatolik";
    console.error("[eskiz] exception", e);
    return { ok: false, error: msg };
  }
}
