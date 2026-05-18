import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import {
  attachSessionCookie,
  createSessionResponseUser,
} from "@/lib/auth-server";
import { verifyPhoneRegisterToken } from "@/lib/verify-phone-token";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      verifyToken?: string;
      password?: string;
    };

    const verifyToken = body.verifyToken;
    const password = typeof body.password === "string" ? body.password : "";

    if (!verifyToken || !password) {
      return NextResponse.json(
        { error: "Ma’lumotlar yetarli emas" },
        { status: 400 },
      );
    }

    const verified = await verifyPhoneRegisterToken(verifyToken);
    if (!verified) {
      return NextResponse.json(
        {
          error:
            "Tasdiqlash muddati tugagan. Telefon va kodni qaytadan kiriting.",
        },
        { status: 401 },
      );
    }

    await connectDB();

    const user = await User.findOne({ phone: verified.phone });
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
