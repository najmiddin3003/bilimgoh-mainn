export const NEW_USER_PROMO_STORAGE_KEY = "bilimgoh_new_user_promo";
export const NEW_USER_PROMO_CODE = "TAKLIF15";
/** Ro‘yxatdan keyin modal chiqishidan oldin kutish */
export const NEW_USER_PROMO_DELAY_MS = 60 * 1000;
/** Promo amal qilish muddati */
export const NEW_USER_PROMO_DURATION_MS = 24 * 60 * 60 * 1000;

export type NewUserPromoData = {
  registeredAt: number;
};

export function activateNewUserPromo(): void {
  if (typeof window === "undefined") return;

  const payload: NewUserPromoData = { registeredAt: Date.now() };
  localStorage.setItem(NEW_USER_PROMO_STORAGE_KEY, JSON.stringify(payload));
}

export function getNewUserPromo(): NewUserPromoData | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(NEW_USER_PROMO_STORAGE_KEY);
    if (!raw) return null;

    const data = JSON.parse(raw) as NewUserPromoData;
    if (typeof data.registeredAt !== "number") return null;

    return data;
  } catch {
    return null;
  }
}

export function clearExpiredNewUserPromo(): void {
  if (typeof window === "undefined") return;

  const data = getNewUserPromo();
  if (!data) return;

  if (Date.now() > data.registeredAt + NEW_USER_PROMO_DURATION_MS) {
    localStorage.removeItem(NEW_USER_PROMO_STORAGE_KEY);
  }
}

export function isNewUserPromoActive(data: NewUserPromoData): boolean {
  const now = Date.now();
  return (
    now >= data.registeredAt + NEW_USER_PROMO_DELAY_MS &&
    now <= data.registeredAt + NEW_USER_PROMO_DURATION_MS
  );
}

export function msUntilPromoCanShow(data: NewUserPromoData): number {
  const showAt = data.registeredAt + NEW_USER_PROMO_DELAY_MS;
  return Math.max(0, showAt - Date.now());
}
