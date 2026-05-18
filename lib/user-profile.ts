import type { IUser } from "@/models/User";
import { isProfileComplete } from "@/lib/auth-user";
import { toTwelveDigit, normalizeNineDigits } from "@/lib/phone";

export type ProfileInput = {
  firstName: string;
  lastName: string;
  age: number;
  phone?: string;
};

export function parseAge(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.floor(value);
  }
  if (typeof value === "string" && /^\d+$/.test(value.trim())) {
    return Number.parseInt(value.trim(), 10);
  }
  return null;
}

export function parseProfileBody(body: {
  firstName?: unknown;
  lastName?: unknown;
  age?: unknown;
  phone?: unknown;
}): { ok: true; data: ProfileInput } | { ok: false; error: string; status: number } {
  const firstName =
    typeof body.firstName === "string" ? body.firstName.trim() : "";
  const lastName =
    typeof body.lastName === "string" ? body.lastName.trim() : "";
  const age = parseAge(body.age);

  if (firstName.length < 2) {
    return {
      ok: false,
      error: "Ism kamida 2 ta harfdan iborat bo‘lishi kerak",
      status: 400,
    };
  }

  if (lastName.length < 2) {
    return {
      ok: false,
      error: "Familiya kamida 2 ta harfdan iborat bo‘lishi kerak",
      status: 400,
    };
  }

  if (age === null || age < 10 || age > 100) {
    return {
      ok: false,
      error: "Yosh 10 dan 100 gacha bo‘lishi kerak",
      status: 400,
    };
  }

  let phone: string | undefined;
  if (typeof body.phone === "string" && body.phone.trim()) {
    const nine = normalizeNineDigits(body.phone);
    if (!nine) {
      return {
        ok: false,
        error: "Telefon raqami noto‘g‘ri",
        status: 400,
      };
    }
    phone = toTwelveDigit(nine);
  }

  return {
    ok: true,
    data: { firstName, lastName, age, phone },
  };
}

export function buildProfileUpdate(
  data: ProfileInput,
): Pick<IUser, "firstName" | "lastName" | "age" | "profileCompleted"> {
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    age: data.age,
    profileCompleted: isProfileComplete({
      firstName: data.firstName,
      lastName: data.lastName,
    }),
  };
}
