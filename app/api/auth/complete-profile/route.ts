import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { getSessionPayload } from "@/lib/auth-server";
import { toPublicAuthUser } from "@/lib/auth-user";
import { buildProfileUpdate, parseProfileBody } from "@/lib/user-profile";

export async function POST(req: Request) {
  try {
    const session = await getSessionPayload();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as Record<string, unknown>;
    const parsed = parseProfileBody(body);

    if (!parsed.ok) {
      return NextResponse.json(
        { error: parsed.error },
        { status: parsed.status },
      );
    }

    if (parsed.data.phone && parsed.data.phone !== session.phone) {
      return NextResponse.json(
        { error: "Telefon raqami sessiya bilan mos kelmaydi" },
        { status: 403 },
      );
    }

    await connectDB();

    const doc = await User.findByIdAndUpdate(
      session.sub,
      { $set: buildProfileUpdate(parsed.data) },
      { new: true, runValidators: true },
    ).lean();

    if (!doc) {
      return NextResponse.json(
        { error: "Foydalanuvchi topilmadi" },
        { status: 404 },
      );
    }

    if (doc.phone !== session.phone) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({
      ok: true,
      user: toPublicAuthUser(doc),
    });
  } catch (e) {
    console.error("[complete-profile]", e);
    return NextResponse.json({ error: "Server xatolik" }, { status: 500 });
  }
}
