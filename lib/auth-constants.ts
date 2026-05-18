/** Kodning amal qilish va qayta SMS oralig‘i (sekund) */
export const OTP_TTL_SECONDS = 120;
export const OTP_RESEND_COOLDOWN_SECONDS = 120;

/**
 * Eskiz.uz da moderatsiyadan o‘tgan SMS shabloni.
 * {#code#} o‘rniga 6 xonali kod qo‘yiladi — matn kabinetdagi shablon bilan bir xil bo‘lishi kerak.
 */
export const ESKIZ_OTP_SMS_TEMPLATE =
  process.env.ESKIZ_SMS_TEMPLATE?.trim() ||
  "Bilimgoh platformasiga kirish uchun tasdiqlash kodi: {#code#}. Kodni hech kimga bermang.";
