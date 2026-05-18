import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import {
  attachSessionCookie,
  createSessionResponseUser,
} from "@/lib/auth-server";
import { verifyPhoneRegisterToken } from "@/lib/verify-phone-token";
import { normalizeNineDigits, toTwelveDigit } from "@/lib/phone";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      verifyToken?: string;
      phone?: string;
      password?: string;
    };

    const password = typeof body.password === "string" ? body.password : "";
    if (!password) {
      return NextResponse.json(
        { error: "Parol kiritilmagan" },
        { status: 400 },
      );
    }

    await connectDB();

    let phone12: string | null = null;

    if (typeof body.verifyToken === "string" && body.verifyToken) {
      const verified = await verifyPhoneRegisterToken(body.verifyToken);
      if (!verified) {
        return NextResponse.json(
          {
            error:
              "Tasdiqlash muddati tugagan. Telefon va kodni qaytadan kiriting.",
          },
          { status: 401 },
        );
      }
      phone12 = verified.phone;
    } else {
      const phone9 = normalizeNineDigits(String(body.phone ?? ""));
      if (!phone9) {
        return NextResponse.json(
          { error: "Telefon raqami noto‘g‘ri"},
          { status: 400 },
        );
      }
      phone12 = toTwelveDigit(phone9);
    }

    const user = await User.findOne({ phone: phone12 }).select("+passwordHash");
    if (!user) {
      return NextResponse.json(
        { error: "Hisob topilmadi. Avval ro‘yxatdan o‘ting." },
        { status: 404 },
      );
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return NextResponse.json({ error: "Parol noto‘g‘ri" }, { status: 401 });
    }

    const { token, user: publicUser } = await createSessionResponseUser(
      user._id.toString(),
      user.phone,
    );

    return attachSessionCookie(
      NextResponse.json({ ok: true, user: publicUser }),
      token,
    );
  } catch (e) {
    console.error("[login]", e);
    return NextResponse.json({ error: "Server xatolik" }, { status: 500 });
  }
}
