import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { verifyPhoneRegisterToken } from "@/lib/verify-phone-token";

function isStrongEnough(password: string): boolean {
  const hasLetter = /[A-Za-z\u0400-\u04FFЁёҚқҒғҲҳЎў]/.test(password);
  const hasNumber = /\d/.test(password);
  return password.length >= 8 && hasLetter && hasNumber;
}

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

    if (!isStrongEnough(password)) {
      return NextResponse.json(
        { error: "Parol talablarga javob bermaydi" },
        { status: 400 },
      );
    }

    await connectDB();

    const exists = await User.findOne({ phone: verified.phone });
    if (exists) {
      return NextResponse.json(
        { error: "Bu telefon bilan akkaunt allaqachon mavjud" },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await User.create({
      phone: verified.phone,
      passwordHash,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[register]", e);
    return NextResponse.json({ error: "Server xatolik" }, { status: 500 });
  }
}
