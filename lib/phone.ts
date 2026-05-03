/** 9 ta raqam (masalan 901234567) */
export function normalizeNineDigits(input: string): string | null {
  const d = input.replace(/\D/g, "");
  if (d.length !== 9) return null;
  return d;
}

export function toTwelveDigit(phone9: string): string {
  return `998${phone9}`;
}
