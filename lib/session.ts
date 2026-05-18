import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE_NAME = "bilimgoh_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export type SessionPayload = {
  sub: string;
  phone: string;
};

function getSecret() {
  const s = process.env.OTP_JWT_SECRET;
  if (!s || s.length < 16) {
    throw new Error("OTP_JWT_SECRET kamida 16 belgi bo‘lishi kerak");
  }
  return new TextEncoder().encode(s);
}

export async function createSessionToken(
  payload: SessionPayload,
): Promise<string> {
  return new SignJWT({ phone: payload.phone, purpose: "session" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(getSecret());
}

export async function verifySessionToken(
  token: string,
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    const sub = payload.sub;
    const phone = payload.phone;
    const purpose = payload.purpose;
    if (
      typeof sub !== "string" ||
      typeof phone !== "string" ||
      purpose !== "session"
    ) {
      return null;
    }
    return { sub, phone };
  } catch {
    return null;
  }
}
