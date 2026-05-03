import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import OtpCode from "@/models/OtpCode";
import { getMongoConnectionUserMessage } from "@/lib/mongo-errors";
import { normalizeNineDigits, toTwelveDigit } from "@/lib/phone";
import { signPhoneVerifyToken } from "@/lib/verify-phone-token";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { phone?: string; code?: string };
    const phone = normalizeNineDigits(String(body.phone ?? ""));
    const digits = String(body.code ?? "").replace(/\D/g, "");

    if (!phone || digits.length !== 6) {
      return NextResponse.json(
        { error: "Telefon yoki kod noto‘g‘ri" },
        { status: 400 },
      );
    }

    await connectDB();

    const doc = await OtpCode.findOne({ phone });
    if (!doc || doc.expiresAt.getTime() <= Date.now()) {
      return NextResponse.json(
        {
          error:
            "Kod muddati tugagan yoki topilmadi. «Kod kelmadimi?» orqali yangi kod oling.",
        },
        { status: 400 },
      );
    }

    const match = await bcrypt.compare(digits, doc.codeHash);
    if (!match) {
      return NextResponse.json({ error: "Kod noto‘g‘ri" }, { status: 400 });
    }

    await OtpCode.deleteOne({ phone });

    const phone12 = toTwelveDigit(phone);
    const verifyToken = await signPhoneVerifyToken(phone12);

    return NextResponse.json({ ok: true, verifyToken });
  } catch (e) {
    console.error("[verify-code]", e);
    const hint = getMongoConnectionUserMessage(e);
    return NextResponse.json(
      { error: hint ?? "Server xatolik" },
      { status: hint ? 503 : 500 },
    );
  }
}
