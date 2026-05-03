/**
 * Mongo ulanish xatolarini foydalanuvchi uchun qisqa izohga aylantirish.
 * querySrv / ECONNREFUSED — odatda DNS, VPN yoki Atlas SRV bloklanganida chiqadi.
 */
export function getMongoConnectionUserMessage(error: unknown): string | null {
  if (!error || typeof error !== "object") return null;

  const e = error as {
    code?: string;
    message?: string;
    name?: string;
    syscall?: string;
  };

  const msg = typeof e.message === "string" ? e.message : "";
  const syscall = typeof e.syscall === "string" ? e.syscall : "";

  if (syscall === "querySrv" || msg.includes("querySrv")) {
    return "MongoDB ga ulanib bo‘lmadi (DNS/SRV). VPN ni o‘ching, internetni tekshiring yoki Atlas dan «standard» connection string (mongodb://…) dan foydalaning.";
  }

  if (
    e.code === "ECONNREFUSED" ||
    e.code === "ENOTFOUND" ||
    e.code === "ETIMEDOUT"
  ) {
    return "MongoDB serveriga ulanib bo‘lmadi. Atlas Network Access (IP) va cluster ishlayotganini tekshiring.";
  }

  if (e.name === "MongoServerSelectionError" || e.name === "MongoNetworkError") {
    return "MongoDB bilan aloqa uzildi. MONGODB_URI va tarmoqni tekshiring.";
  }

  return null;
}
