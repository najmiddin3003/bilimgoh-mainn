import { SignJWT, jwtVerify } from "jose";

const getSecret = () => {
  const s = process.env.OTP_JWT_SECRET;
  if (!s || s.length < 16) {
    throw new Error("OTP_JWT_SECRET kamida 16 belgi bo‘lishi kerak");
  }
  return new TextEncoder().encode(s);
};

/** SMS tasdiqlanganidan keyin parol qo‘yish uchun qisqa muddatli token */
export async function signPhoneVerifyToken(phone12: string): Promise<string> {
  return new SignJWT({ phone: phone12, purpose: "register" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(getSecret());
}

export async function verifyPhoneRegisterToken(
  token: string,
): Promise<{ phone: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    const phone = payload.phone;
    const purpose = payload.purpose;
    if (
      typeof phone !== "string" ||
      typeof purpose !== "string" ||
      purpose !== "register"
    ) {
      return null;
    }
    if (!/^998[0-9]{9}$/.test(phone)) return null;
    return { phone };
  } catch {
    return null;
  }
}
