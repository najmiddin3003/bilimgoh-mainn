import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { randomInt } from "crypto";
import connectDB from "@/lib/mongodb";
import OtpCode from "@/models/OtpCode";
import {
  OTP_RESEND_COOLDOWN_SECONDS,
  OTP_TTL_SECONDS,
} from "@/lib/auth-constants";
import { buildEskizOtpMessage, mapEskizErrorForUser, sendEskizSms } from "@/lib/eskiz";
import { getMongoConnectionUserMessage } from "@/lib/mongo-errors";
import { normalizeNineDigits, toTwelveDigit } from "@/lib/phone";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { phone?: string };
    const phone = normalizeNineDigits(String(body.phone ?? ""));
    if (!phone) {
      return NextResponse.json(
        { error: "Telefon 9 raqam bo‘lishi kerak" },
        { status: 400 },
      );
    }

    await connectDB();

    const cooldownMs = OTP_RESEND_COOLDOWN_SECONDS * 1000;
    const existing = await OtpCode.findOne({ phone });

    if (existing?.lastSentAt) {
      const elapsed = Date.now() - existing.lastSentAt.getTime();
      if (elapsed < cooldownMs) {
        const waitSeconds = Math.ceil((cooldownMs - elapsed) / 1000);
        return NextResponse.json(
          {
            error: `Yangi kodni ${waitSeconds} s dan keyin so‘rashingiz mumkin`,
            waitSeconds: waitSeconds,
          },
          { status: 429 },
        );
      }
    }

    const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
    const codeHash = await bcrypt.hash(code, 10);
    const now = new Date();
    const expiresAt = new Date(now.getTime() + OTP_TTL_SECONDS * 1000);

    await OtpCode.findOneAndUpdate(
      { phone },
      {
        codeHash,
        expiresAt,
        lastSentAt: now,
      },
      { upsert: true, new: true },
    );

    const mobile998 = toTwelveDigit(phone);
    const message = buildEskizOtpMessage(code);
    const sms = await sendEskizSms(mobile998, message);

    if (!sms.ok) {
      await OtpCode.deleteOne({ phone });
      const raw = "error" in sms ? sms.error : "SMS yuborilmadi";
      return NextResponse.json(
        { error: mapEskizErrorForUser(raw) },
        { status: 502 },
      );
    }

    if ("skipped" in sms && sms.skipped) {
      console.info(`[dev] OTP ${phone}: ${message}`);
    }

    const resendAvailableAt = now.getTime() + cooldownMs;

    return NextResponse.json({
      ok: true,
      expiresAt: expiresAt.getTime(),
      ttlSeconds: OTP_TTL_SECONDS,
      resendAvailableAt,
    });
  } catch (e) {
    console.error("[send-code]", e);
    const hint = getMongoConnectionUserMessage(e);
    return NextResponse.json(
      { error: hint ?? "Server xatolik" },
      { status: hint ? 503 : 500 },
    );
  }
}
