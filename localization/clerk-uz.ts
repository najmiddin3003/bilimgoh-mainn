import { enUS } from "@clerk/localizations";
import type { LocalizationResource } from "@clerk/types";

export const uz: LocalizationResource = {
  ...enUS,

  signIn: {
    ...(enUS.signIn ?? {}),
    start: {
      ...(enUS.signIn?.start ?? {}),
      title: "Hisobga kirish",
      subtitle: "Davom etish uchun tizimga kiring",
      actionText: "Hisobingiz yo‘qmi?",
      actionLink: "Ro‘yxatdan o‘tish",
    },
  },

  signUp: {
    ...(enUS.signUp ?? {}),
    start: {
      ...(enUS.signUp?.start ?? {}),
      title: "Ro‘yxatdan o‘tish",
      subtitle: "Yangi hisob yarating",
      actionText: "Hisobingiz bormi?",
      actionLink: "Kirish",
    },
  },

  userProfile: {
    ...(enUS.userProfile ?? {}),

    navbar: {
      ...(enUS.userProfile?.navbar ?? {}),
      title: "Hisob",
      description: "Hisobingiz ma'lumotlarini boshqaring",
    },
  },

  userButton: {
    ...(enUS.userButton ?? {}),
    action__manageAccount: "Profilni boshqarish",
    action__signOut: "Chiqish",
  },

  formFieldLabel__emailAddress: "Email manzil",
  formFieldLabel__password: "Parol",

  formButtonPrimary: "Davom etish",

  dividerText: "yoki",

  socialButtonsBlockButton: "{{provider}} orqali davom etish",
};
