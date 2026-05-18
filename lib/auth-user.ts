import type { IUser } from "@/models/User";
import { normalizeLikedCourseIds } from "@/lib/course-catalog";

export type PublicAuthUser = {
  id: string;
  phone: string;
  phoneDisplay: string;
  initials: string;
  firstName: string;
  lastName: string;
  age: number | null;
  profileCompleted: boolean;
  displayName: string;
  likedCourseIds: number[];
};

/** 998901234567 → +998 (90) 123 45 67 */
export function formatPhoneDisplay(phone12: string): string {
  const d = phone12.replace(/\D/g, "");
  const nine = d.startsWith("998") ? d.slice(3) : d.slice(-9);
  if (nine.length !== 9) return `+${d}`;
  return `+998 (${nine.slice(0, 2)}) ${nine.slice(2, 5)} ${nine.slice(5, 7)} ${nine.slice(7, 9)}`;
}

export function phoneToInitials(phone12: string): string {
  const nine = phone12.replace(/\D/g, "").slice(-9);
  if (nine.length >= 2) return nine.slice(-2).toUpperCase();
  return "BG";
}

export function nameToInitials(firstName: string, lastName: string): string {
  const a = firstName.trim()[0] ?? "";
  const b = lastName.trim()[0] ?? "";
  const combined = `${a}${b}`.toUpperCase();
  return combined || "BG";
}

export function buildDisplayName(firstName: string, lastName: string): string {
  const first = firstName.trim();
  const last = lastName.trim();
  if (!first && !last) return "";
  if (!last) return first;
  return `${first} ${last}`;
}

/** Ism va familiya to‘ldirilgan bo‘lsa, profil yakunlangan hisoblanadi */
export function isProfileComplete(
  user: Pick<PublicAuthUser, "firstName" | "lastName">,
): boolean {
  return user.firstName.trim().length >= 2 && user.lastName.trim().length >= 2;
}

export function toPublicAuthUser(
  doc: IUser & { _id: { toString(): string } },
): PublicAuthUser {
  const phone = doc.phone;
  const firstName = typeof doc.firstName === "string" ? doc.firstName.trim() : "";
  const lastName = typeof doc.lastName === "string" ? doc.lastName.trim() : "";
  const age = typeof doc.age === "number" ? doc.age : null;
  const displayName = buildDisplayName(firstName, lastName);
  const profileCompleted =
    Boolean(doc.profileCompleted) || isProfileComplete({ firstName, lastName });

  const initials =
    firstName.length > 0
      ? nameToInitials(firstName, lastName)
      : phoneToInitials(phone);

  return {
    id: doc._id.toString(),
    phone,
    phoneDisplay: formatPhoneDisplay(phone),
    initials,
    firstName,
    lastName,
    age,
    profileCompleted,
    displayName,
    likedCourseIds: normalizeLikedCourseIds(doc.likedCourseIds),
  };
}
