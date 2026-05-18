import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  verifySessionToken,
} from "@/lib/session";
import { toPublicAuthUser, type PublicAuthUser } from "@/lib/auth-user";

export async function getSessionPayload() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function getSessionPayloadFromRequest(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function getCurrentUser(): Promise<PublicAuthUser | null> {
  const session = await getSessionPayload();
  if (!session) return null;

  await connectDB();
  const doc = await User.findById(session.sub).lean();
  if (!doc || doc.phone !== session.phone) return null;

  return toPublicAuthUser(doc);
}

export async function createSessionResponseUser(
  userId: string,
  phone: string,
): Promise<{ token: string; user: PublicAuthUser }> {
  await connectDB();
  const doc = await User.findById(userId).lean();
  if (!doc) throw new Error("User not found");

  const token = await createSessionToken({ sub: userId, phone });
  return {
    token,
    user: toPublicAuthUser(doc),
  };
}

export function attachSessionCookie(
  response: NextResponse,
  token: string,
): NextResponse {
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return response;
}
