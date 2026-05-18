import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
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
    const phone12 = toTwelveDigit(phone);
    const isRegistered = Boolean(await User.findOne({ phone: phone12 }).lean());

    return NextResponse.json({ ok: true, isRegistered });
  } catch (e) {
    console.error("[check-phone]", e);
    const hint = getMongoConnectionUserMessage(e);
    return NextResponse.json(
      { error: hint ?? "Server xatolik" },
      { status: hint ? 503 : 500 },
    );
  }
}
