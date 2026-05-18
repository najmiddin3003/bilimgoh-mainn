import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { getSessionPayload } from "@/lib/auth-server";
import { toPublicAuthUser } from "@/lib/auth-user";
import {
  normalizeLikedCourseIds,
  parseCourseId,
  resolveLikedCourses,
} from "@/lib/course-catalog";

export async function GET() {
  try {
    const session = await getSessionPayload();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const doc = await User.findById(session.sub).lean();
    if (!doc || doc.phone !== session.phone) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const likedCourseIds = normalizeLikedCourseIds(doc.likedCourseIds);

    return NextResponse.json({
      likedCourseIds,
      courses: resolveLikedCourses(likedCourseIds),
    });
  } catch (e) {
    console.error("[liked-courses GET]", e);
    return NextResponse.json({ error: "Server xatolik" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSessionPayload();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as { courseId?: unknown };
    const courseId = parseCourseId(body.courseId);
    if (courseId === null) {
      return NextResponse.json(
        { error: "Kurs topilmadi yoki noto‘g‘ri ID" },
        { status: 400 },
      );
    }

    await connectDB();
    const doc = await User.findById(session.sub).lean();
    if (!doc || doc.phone !== session.phone) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const current = normalizeLikedCourseIds(doc.likedCourseIds);
    const isLiked = current.includes(courseId);
    const likedCourseIds = isLiked
      ? current.filter((id) => id !== courseId)
      : [...current, courseId];

    const updated = await User.findByIdAndUpdate(
      session.sub,
      { $set: { likedCourseIds } },
      { new: true, runValidators: true },
    ).lean();

    if (!updated) {
      return NextResponse.json(
        { error: "Foydalanuvchi topilmadi" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      ok: true,
      liked: !isLiked,
      likedCourseIds,
      courses: resolveLikedCourses(likedCourseIds),
      user: toPublicAuthUser(updated),
    });
  } catch (e) {
    console.error("[liked-courses POST]", e);
    return NextResponse.json({ error: "Server xatolik" }, { status: 500 });
  }
}
