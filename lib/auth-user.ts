import type { IUser } from "@/models/User";

export type PublicAuthUser = {
  id: string;
  phone: string;
  phoneDisplay: string;
  initials: string;
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

export function toPublicAuthUser(
  doc: IUser & { _id: { toString(): string } },
): PublicAuthUser {
  const phone = doc.phone;
  return {
    id: doc._id.toString(),
    phone,
    phoneDisplay: formatPhoneDisplay(phone),
    initials: phoneToInitials(phone),
  };
}
