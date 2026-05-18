"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  ShieldCheck,
  Check,
  Circle,
  Loader2,
} from "lucide-react";
import Logo from "@/components/shared/logo";
import { useAuth } from "@/components/providers/auth-provider";
import { OTP_TTL_SECONDS } from "@/lib/auth-constants";
import type { PublicAuthUser } from "@/lib/auth-user";
import { activateNewUserPromo } from "@/lib/new-user-promo";
import { cn } from "@/lib/utils";

type Step = "phone" | "code" | "password";

const PHONE_DIGITS = 9;
const OTP_LENGTH = 6;

function digitsOnly(value: string) {
  return value.replace(/\D/g, "").slice(0, PHONE_DIGITS);
}

function formatPhoneDisplay(value: string) {
  const d = digitsOnly(value);

  const g1 = d.slice(0, 2);
  const g2 = d.slice(2, 5);
  const g3 = d.slice(5, 7);
  const g4 = d.slice(7, 9);

  if (!d) return "";
  if (d.length <= 2) return `(${g1}${d.length === 2 ? ")" : ""}`;

  let out = `(${g1})`;
  if (g2) out += ` ${g2}`;
  if (g3) out += ` ${g3}`;
  if (g4) out += ` ${g4}`;

  return out;
}

function validatePassword(password: string) {
  const hasLetter = /[A-Za-z\u0400-\u04FFЁёҚқҒғҲҳЎў]/.test(password);
  const hasNumber = /\d/.test(password);
  const minLength = password.length >= 8;
  const hasSpecial = /[^A-Za-z0-9\u0400-\u04FFЁёҚқҒғҲҳЎў]/.test(password);

  return {
    minLength,
    letterAndNumber: hasLetter && hasNumber,
    hasSpecial,
  };
}

const stepMotion = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
};

function ErrorAlert({ message, id }: { message: string; id?: string }) {
  if (!message) return null;

  return (
    <p
      id={id}
      role="alert"
      className="mt-4 rounded-lg border border-red-100/90 bg-red-50/90 px-3 py-2.5 text-left text-[13px] leading-snug text-red-700"
    >
      {message}
    </p>
  );
}

export default function AuthPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, refresh, setUser } =
    useAuth();
  const [step, setStep] = useState<Step>("phone");

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState(Array(OTP_LENGTH).fill(""));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  /** Serverdan kelgan UNIX ms — kodning amal qilish muddati */
  const [otpExpiresAt, setOtpExpiresAt] = useState<number | null>(null);
  /** SMS tekshiruvidan keyin parol bosqichi uchun JWT */
  const [verifyToken, setVerifyToken] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  /** Ro‘yxatdan o‘tgan user — SMS o‘tkazib parol bilan kirish */
  const [skipOtpLogin, setSkipOtpLogin] = useState(false);

  const codeRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace("/");
    }
  }, [authLoading, isAuthenticated, router]);

  const goBack = () => {
    setError("");

    if (step === "code") {
      setStep("phone");
      setOtpExpiresAt(null);
      setCode(Array(OTP_LENGTH).fill(""));
    }
    if (step === "password") {
      if (skipOtpLogin) {
        setStep("phone");
        setSkipOtpLogin(false);
        setIsRegistered(false);
        setPassword("");
        setConfirmPassword("");
      } else {
        setStep("code");
        setVerifyToken(null);
        setIsRegistered(false);
      }
    }
  };

  const handlePhoneContinue = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/auth/check-phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = (await res.json()) as {
        error?: string;
        isRegistered?: boolean;
      };

      if (!res.ok) {
        setError(
          typeof data.error === "string"
            ? data.error
            : "Telefon tekshirilmadi.",
        );
        return;
      }

      if (data.isRegistered) {
        setIsRegistered(true);
        setSkipOtpLogin(true);
        setVerifyToken(null);
        setPassword("");
        setConfirmPassword("");
        setStep("password");
        return;
      }

      await sendCode();
    } catch {
      setError("Tarmoq xatolik. Internetni tekshiring.");
    } finally {
      setLoading(false);
    }
  };

  const sendCode = async (options?: { resend?: boolean }) => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = (await res.json()) as {
        error?: string;
        expiresAt?: number;
      };

      if (!res.ok) {
        setError(
          typeof data.error === "string"
            ? data.error
            : "Kod yuborishda xatolik.",
        );
        return;
      }

      if (typeof data.expiresAt === "number") {
        setOtpExpiresAt(data.expiresAt);
      }

      setCode(Array(OTP_LENGTH).fill(""));
      if (!options?.resend) {
        setStep("code");
      }
    } catch {
      setError("Tarmoq xatolik. Internetni tekshiring.");
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    const otp = code.join("");

    if (otp.length !== OTP_LENGTH) {
      setError("6 xonali kodni to‘liq kiriting.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code: otp }),
      });

      const data = (await res.json()) as {
        error?: string;
        verifyToken?: string;
        isRegistered?: boolean;
      };

      if (!res.ok) {
        setError(
          typeof data.error === "string" ? data.error : "Kod tekshirilmadi.",
        );
        return;
      }

      if (typeof data.verifyToken === "string") {
        setVerifyToken(data.verifyToken);
      }
      setIsRegistered(Boolean(data.isRegistered));
      setSkipOtpLogin(false);
      setStep("password");
    } catch {
      setError("Tarmoq xatolik.");
    } finally {
      setLoading(false);
    }
  };

  const submitPassword = async () => {
    if (!isRegistered && !verifyToken) {
      setError("Avval telefonni tasdiqlang.");
      return;
    }

    if (isRegistered && !skipOtpLogin && !verifyToken) {
      setError("Avval telefonni tasdiqlang.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const endpoint = isRegistered
        ? "/api/auth/login"
        : "/api/auth/register";

      const loginBody =
        skipOtpLogin && isRegistered
          ? { phone, password }
          : { verifyToken, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(
          isRegistered ? loginBody : { verifyToken, password },
        ),
      });

      const data = (await res.json()) as {
        error?: string;
        user?: PublicAuthUser;
      };

      if (!res.ok) {
        setError(
          typeof data.error === "string"
            ? data.error
            : isRegistered
              ? "Kirish amalga oshmadi."
              : "Hisob yaratilmadi.",
        );
        return;
      }

      if (data.user) {
        setUser(data.user);
      } else {
        await refresh();
      }

      if (!isRegistered) {
        activateNewUserPromo();
      }

      router.push("/");
    } catch {
      setError(
        isRegistered
          ? "Kirishda xatolik. Keyinroq urinib ko‘ring."
          : "Hisob yaratishda xatolik. Keyinroq urinib ko‘ring.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError("");

    if (value && index < OTP_LENGTH - 1) {
      codeRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      codeRefs.current[index - 1]?.focus();
    }
  };

  const handleCodePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!pasted) return;

    const newCode = Array(OTP_LENGTH).fill("");

    pasted.split("").forEach((char, index) => {
      newCode[index] = char;
    });

    setCode(newCode);

    const nextIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    codeRefs.current[nextIndex]?.focus();
  };

  if (authLoading || isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(16,185,129,0.06),transparent)] bg-zinc-50">
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Brand panel — viewport chapiga qotirilgan (scrollda harakatsiz) */}
        <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[min(44%,1020px)] max-w-full overflow-hidden bg-gradient-to-br from-green-700 via-green-600 to-emerald-800 lg:flex lg:flex-col lg:p-12 xl:p-14">
          <Image
            src="/0x0.jpg"
            alt="BilimGoh"
            fill
            priority
            className="z-0 object-cover object-center"
            sizes="(max-width: 1024px) 100vw, min(44vw, 520px)"
          />

          {/* Qorong‘u yashil qoplama — matn va kontrast */}
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-br from-emerald-950/82 via-emerald-900/78 to-teal-950/88"
            aria-hidden
          />

          <div
            className="pointer-events-none absolute inset-0 z-[1] opacity-35"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.12) 0%, transparent 45%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.15) 0%, transparent 40%)",
            }}
            aria-hidden
          />

          <div className="relative z-10 flex min-h-0 w-full flex-1 flex-col justify-between gap-10">
            <div>
              <div className="flex items-center gap-2 text-white">
                <Logo white={true} />
              </div>

              <h2 className="mt-10 max-w-sm text-3xl font-semibold leading-tight tracking-tight text-white xl:text-[2rem]">
                O‘rganish va rivojlanish uchun bitta joy
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-green-100/95">
                Kurslar, mentorlar va jamoa — barchasi xavfsiz akkauntingiz
                orqali.
              </p>
            </div>

            <footer className="shrink-0 border-t border-white/15 pt-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/20 backdrop-blur-sm">
                    <ShieldCheck
                      className="h-4 w-4 text-green-200"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </span>
                  <div className="text-left">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55">
                      Ishonchli platforma
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-white/90">
                      Ma’lumotlaringiz shifrlanadi
                    </p>
                  </div>
                </div>
                <p className="text-[11px] tabular-nums text-green-100/75 sm:text-right">
                  <span className="font-semibold text-white/95">BilimGoh</span>
                  <span className="mx-1.5 text-white/35" aria-hidden>
                    ·
                  </span>
                  © {new Date().getFullYear()}
                </p>
              </div>
            </footer>
          </div>
        </aside>

        {/* Form — katta ekranda chap fixed panel kengligi uchun bo‘shliq */}
        <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6 lg:ml-[min(44%,1020px)] lg:min-h-screen lg:px-10">
          <section
            className="relative w-full max-w-[420px]"
            aria-label="Kirish yoki ro‘yxatdan o‘tish"
          >
            <div className="overflow-hidden rounded-[1.25rem] border border-zinc-200/70 bg-white/95 shadow-[0_12px_48px_-16px_rgba(15,23,42,0.11)] backdrop-blur-sm ring-1 ring-zinc-950/[0.02]">
              <div className="border-b border-zinc-100/90 bg-gradient-to-b from-zinc-50/90 to-white px-6 py-5 sm:px-8">
                <header className="flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={step === "phone"}
                    className={cn(
                      "-ml-1 rounded-full p-2 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600/80",
                      step === "phone"
                        ? "cursor-default text-zinc-300"
                        : "text-zinc-500 hover:bg-zinc-100/90 hover:text-emerald-800",
                    )}
                    aria-label="Orqaga"
                  >
                    <ArrowLeft className="h-[18px] w-[18px]" strokeWidth={2} />
                  </button>
                  <Logo white={false} />
                </header>

                <StepProgress step={step} skipCodeStep={skipOtpLogin} />
              </div>

              <div className="px-6 pb-8 pt-7 sm:px-8 sm:pt-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={stepMotion.initial}
                    animate={stepMotion.animate}
                    exit={stepMotion.exit}
                    transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    {step === "phone" && (
                      <PhoneStep
                        phone={phone}
                        setPhone={setPhone}
                        loading={loading}
                        error={error}
                        onNext={handlePhoneContinue}
                      />
                    )}

                    {step === "code" && (
                      <CodeStep
                        phone={phone}
                        code={code}
                        codeRefs={codeRefs}
                        loading={loading}
                        error={error}
                        otpExpiresAt={otpExpiresAt}
                        onResend={() => sendCode({ resend: true })}
                        onChange={handleCodeChange}
                        onKeyDown={handleCodeKeyDown}
                        onPaste={handleCodePaste}
                        onNext={verifyCode}
                      />
                    )}

                    {step === "password" && (
                      <PasswordStep
                        password={password}
                        setPassword={setPassword}
                        confirmPassword={confirmPassword}
                        setConfirmPassword={setConfirmPassword}
                        loading={loading}
                        error={error}
                        onSubmit={submitPassword}
                        isRegistered={isRegistered}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <p className="mt-7 text-center text-[11px] leading-relaxed text-zinc-400">
              Davom etish bilan{" "}
              <span className="font-medium text-zinc-500">
                platforma qoidalariga
              </span>{" "}
              rozilik bildirasiz.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

function StepProgress({
  step,
  skipCodeStep = false,
}: {
  step: Step;
  skipCodeStep?: boolean;
}) {
  const steps: Step[] = ["phone", "code", "password"];
  const labels = ["Telefon", "Kod", "Parol"];
  const activeIndex = steps.indexOf(step);

  const isStepCompleted = (index: number) => {
    if (index < activeIndex) return true;
    if (skipCodeStep && step === "password" && index === 1) return true;
    return false;
  };

  return (
    <nav className="mt-7" aria-label="Ro‘yxatdan o‘tish bosqichlari">
      <ol className="m-0 flex list-none items-center justify-center gap-0 p-0">
        {steps.map((item, index) => (
          <Fragment key={item}>
            <li
              className="flex flex-col items-center gap-1.5"
              aria-current={index === activeIndex ? "step" : undefined}
            >
              <motion.div
                initial={false}
                animate={{
                  scale: index === activeIndex ? 1.03 : 1,
                }}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                className={cn(
                  "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[12px] font-medium tabular-nums shadow-sm transition-colors duration-300",
                  isStepCompleted(index) &&
                    "border-emerald-600/90 bg-emerald-600 text-white shadow-emerald-900/10",
                  index === activeIndex &&
                    "border-emerald-500 bg-white text-emerald-800 shadow-[0_2px_8px_-2px_rgba(16,185,129,0.25)]",
                  index > activeIndex &&
                    "border-zinc-200/90 bg-white text-zinc-400 shadow-none",
                )}
              >
                {isStepCompleted(index) ? (
                  <Check
                    className="h-3.5 w-3.5"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                ) : (
                  <span>{index + 1}</span>
                )}
              </motion.div>
              <span
                className={cn(
                  "max-w-[4.5rem] text-center text-[11px] font-medium leading-tight tracking-tight sm:max-w-none",
                  index === activeIndex
                    ? "text-emerald-800"
                    : isStepCompleted(index)
                      ? "text-emerald-700/85"
                      : "text-zinc-400",
                )}
              >
                {labels[index]}
              </span>
            </li>

            {index < steps.length - 1 && (
              <li
                className="mx-1 flex h-8 min-w-[1.25rem] flex-1 max-w-[5rem] items-center sm:mx-2 sm:min-w-[2rem]"
                aria-hidden
              >
                <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-zinc-100">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-emerald-500/90"
                    initial={false}
                    animate={{
                      width: isStepCompleted(index) ? "100%" : "0%",
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </div>
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}

function PhoneStep({
  phone,
  setPhone,
  loading,
  error,
  onNext,
}: {
  phone: string;
  setPhone: (value: string) => void;
  loading: boolean;
  error: string;
  onNext: () => void;
}) {
  const complete = phone.length === PHONE_DIGITS;

  return (
    <div className="text-center">
      <motion.div
        className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-50/90 ring-1 ring-emerald-100/60"
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex h-11 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-600 to-teal-600 text-base font-light text-white shadow-sm">
          ≡
        </div>
      </motion.div>

      <h1 className="text-lg font-medium tracking-tight text-zinc-900 sm:text-xl">
        Telefon raqamingiz
      </h1>

      <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
        Tasdiqlash kodi SMS orqali yuboriladi
      </p>

      <div className="mt-8 flex gap-2.5">
        <div
          className="flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-zinc-200/80 bg-zinc-50/80 px-2.5 text-[13px] font-medium text-zinc-700"
          aria-hidden
        >
          <span className="text-[15px] leading-none">🇺🇿</span>
          <span>+998</span>
        </div>

        <input
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          id="auth-phone"
          aria-invalid={!!error}
          aria-describedby={error ? "auth-error-phone" : "phone-hint"}
          value={formatPhoneDisplay(phone)}
          onChange={(e) => setPhone(digitsOnly(e.target.value))}
          placeholder="(90) 123 45 67"
          disabled={loading}
          className="h-11 min-w-0 flex-1 rounded-lg border border-zinc-200/80 bg-white px-3.5 text-[15px] text-zinc-900 shadow-sm shadow-zinc-900/[0.02] outline-none transition placeholder:text-zinc-400 focus:border-emerald-400/80 focus:ring-2 focus:ring-emerald-500/10 disabled:opacity-55"
        />
      </div>

      <p id="phone-hint" className="mt-2 text-[11px] text-zinc-400">
        {complete ? (
          <span className="font-medium text-emerald-600/90">
            To‘liq kiritildi
          </span>
        ) : (
          <>
            {phone.length} / {PHONE_DIGITS} raqam
          </>
        )}
      </p>

      <ErrorAlert id="auth-error-phone" message={error} />

      <button
        type="button"
        onClick={onNext}
        disabled={!complete || loading}
        className={cn(
          "mt-7 flex h-10 w-full items-center justify-center gap-2 rounded-lg text-[14px] font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600/70",
          complete && !loading
            ? "bg-emerald-600 text-white shadow-sm shadow-emerald-900/10 hover:bg-emerald-700"
            : "cursor-not-allowed bg-zinc-100/90 text-zinc-400",
        )}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Tekshirilmoqda…
          </>
        ) : (
          <>
            Davom etish
            <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
          </>
        )}
      </button>
    </div>
  );
}

function formatMmSs(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function CodeStep({
  phone,
  code,
  codeRefs,
  loading,
  error,
  otpExpiresAt,
  onResend,
  onChange,
  onKeyDown,
  onPaste,
  onNext,
}: {
  phone: string;
  code: string[];
  codeRefs: React.MutableRefObject<Array<HTMLInputElement | null>>;
  loading: boolean;
  error: string;
  otpExpiresAt: number | null;
  onResend: () => void | Promise<void>;
  onChange: (value: string, index: number) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  onNext: () => void;
}) {
  const isComplete = code.every(Boolean);

  const [secLeft, setSecLeft] = useState(0);

  useEffect(() => {
    if (!otpExpiresAt) return;

    const tick = () => {
      setSecLeft(
        Math.max(0, Math.ceil((otpExpiresAt - Date.now()) / 1000)),
      );
    };

    const startId = window.setTimeout(tick, 0);
    const intervalId = window.setInterval(tick, 300);

    return () => {
      window.clearTimeout(startId);
      window.clearInterval(intervalId);
    };
  }, [otpExpiresAt]);

  const canResend = secLeft === 0;

  return (
    <div className="text-center">
      <motion.div
        className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-50/90 ring-1 ring-emerald-100/50"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative flex h-12 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 shadow-sm">
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/90" />
            ))}
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-emerald-500 text-white shadow-sm">
            <Check className="h-3 w-3" strokeWidth={2.5} />
          </span>
        </div>
      </motion.div>

      <h1 className="text-lg font-medium tracking-tight text-zinc-900 sm:text-xl">
        SMS kodi
      </h1>

      <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
        <span className="font-medium text-zinc-800">
          +998 {formatPhoneDisplay(phone)}
        </span>
        <br />
        raqamiga kod yuborildi. Kod {OTP_TTL_SECONDS} soniya amal qiladi.
      </p>

      <div
        className="mt-8 flex justify-center gap-2 sm:gap-2.5"
        role="group"
        aria-label="Tasdiqlash kodi"
      >
        {code.map((item, index) => (
          <input
            key={index}
            ref={(el) => {
              codeRefs.current[index] = el;
            }}
            maxLength={1}
            value={item}
            onChange={(e) => onChange(e.target.value, index)}
            onKeyDown={(e) => onKeyDown(e, index)}
            onPaste={onPaste}
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            disabled={loading}
            aria-label={`Raqam ${index + 1}`}
            className="h-11 w-9 rounded-lg border border-zinc-200/80 bg-zinc-50/30 text-center text-base font-medium tabular-nums text-zinc-900 shadow-sm shadow-zinc-900/[0.02] outline-none transition focus:border-emerald-400/80 focus:bg-white focus:ring-2 focus:ring-emerald-500/10 disabled:opacity-55 sm:h-12 sm:w-10 sm:text-lg"
          />
        ))}
      </div>

      <div className="mt-8 space-y-1">
        <p className="text-[13px] text-zinc-500">
          {secLeft > 0 ? (
            <>
              Qolgan vaqt:{" "}
              <span className="tabular-nums font-medium text-emerald-700">
                {formatMmSs(secLeft)}
              </span>
            </>
          ) : (
            <span className="text-zinc-600">
              Kod muddati tugadi — yangi kod olishingiz mumkin.
            </span>
          )}
        </p>
        <button
          type="button"
          onClick={() => void onResend()}
          disabled={!canResend || loading}
          className={cn(
            "w-full rounded-lg py-2.5 text-[13px] font-medium transition",
            canResend && !loading
              ? "bg-emerald-50 text-emerald-900 ring-1 ring-emerald-200/70 hover:bg-emerald-100/80"
              : "cursor-not-allowed bg-zinc-100 text-zinc-400",
          )}
        >
          {loading
            ? "SMS yuborilmoqda…"
            : canResend
              ? "Yangi kodni yuborish"
              : `Yangi kod: ${formatMmSs(secLeft)} dan keyin`}
        </button>
      </div>

      <ErrorAlert message={error} />

      <button
        type="button"
        onClick={onNext}
        disabled={!isComplete || loading}
        className={cn(
          "mt-7 flex h-10 w-full items-center justify-center rounded-lg text-[14px] font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600/70",
          isComplete && !loading
            ? "bg-emerald-600 text-white shadow-sm shadow-emerald-900/10 hover:bg-emerald-700"
            : "cursor-not-allowed bg-zinc-100/90 text-zinc-400",
        )}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
            Tekshirilmoqda…
          </>
        ) : (
          "Tasdiqlash"
        )}
      </button>
    </div>
  );
}

function PasswordStep({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  loading,
  error,
  onSubmit,
  isRegistered,
}: {
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  loading: boolean;
  error: string;
  onSubmit: () => void;
  isRegistered: boolean;
}) {
  const rules = useMemo(() => validatePassword(password), [password]);

  const passwordsMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const canSubmit = isRegistered
    ? password.length > 0
    : rules.minLength && rules.letterAndNumber && passwordsMatch;

  const strength = useMemo(() => {
    let score = 0;
    if (rules.minLength) score++;
    if (rules.letterAndNumber) score++;
    if (rules.hasSpecial) score++;
    if (passwordsMatch) score++;
    return score;
  }, [rules, passwordsMatch]);

  const strengthLabels = ["—", "Zaif", "O‘rtacha", "Yaxshi", "Kuchli"];
  const strengthLabel = strengthLabels[strength];

  return (
    <div>
      <div className="text-center">
        <motion.div
          className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-50/90 ring-1 ring-emerald-100/60"
          initial={{ opacity: 0, rotate: -3 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
          <Lock className="h-9 w-9 text-emerald-700/85" strokeWidth={1.65} />
        </motion.div>

        <h1 className="text-lg font-medium tracking-tight text-zinc-900 sm:text-xl">
          {isRegistered ? "Tizimga kirish" : "Parol yarating"}
        </h1>

        <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
          {isRegistered
            ? "Hisobingizga kirish uchun parolingizni kiriting"
            : "Keyingi kirishlar uchun parolingizni eslab qoling"}
        </p>
      </div>

      <div className="mt-8 space-y-3.5">
        <PasswordInput
          label="Parol"
          value={password}
          onChange={setPassword}
          placeholder={isRegistered ? "Parolingiz" : "Kamida 8 belgi"}
          disabled={loading}
          autoComplete={isRegistered ? "current-password" : "new-password"}
        />

        {!isRegistered && (
        <PasswordInput
          label="Parolni tasdiqlang"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Yana bir marta kiriting"
          disabled={loading}
          autoComplete="new-password"
        />
        )}
      </div>

      {!isRegistered && (
        <>
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-medium text-zinc-600">Parol kuchi</span>
          <span
            className={cn(
              "font-semibold tabular-nums",
              strength <= 1
                ? "text-amber-600/95"
                : strength <= 2
                  ? "text-zinc-500"
                  : "text-emerald-700/90",
            )}
          >
            {strengthLabel}
          </span>
        </div>

        <div className="flex h-1.5 gap-1">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={cn(
                "h-full flex-1 rounded-full transition-colors duration-300",
                strength >= i
                  ? strength >= 3
                    ? "bg-emerald-500/95"
                    : "bg-amber-400/85"
                  : "bg-zinc-100/90",
              )}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-zinc-100/90 bg-zinc-50/50 p-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-400">
          Talablar
        </p>

        <div className="mt-3 space-y-2">
          <RuleRow met={rules.minLength} label="Kamida 8 ta belgi" />
          <RuleRow met={rules.letterAndNumber} label="Harflar va raqamlar" />
          <RuleRow met={rules.hasSpecial} label="Maxsus belgi" optional />
          <RuleRow met={passwordsMatch} label="Parollar mos keladi" />
        </div>
      </div>

        </>
      )}

      <ErrorAlert message={error} />

      <button
        type="button"
        onClick={onSubmit}
        disabled={!canSubmit || loading}
        className={cn(
          "mt-7 flex h-10 w-full items-center justify-center gap-2 rounded-lg text-[14px] font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600/70",
          canSubmit && !loading
            ? "bg-emerald-600 text-white shadow-sm shadow-emerald-900/10 hover:bg-emerald-700"
            : "cursor-not-allowed bg-zinc-100/90 text-zinc-400",
        )}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            {isRegistered ? "Kirilmoqda…" : "Yaratilmoqda…"}
          </>
        ) : (
          <>
            {isRegistered ? "Kirish" : "Hisobni yaratish"}
            <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
          </>
        )}
      </button>
    </div>
  );
}

function PasswordInput({
  label,
  value,
  onChange,
  placeholder,
  disabled,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
  autoComplete?: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="block text-left">
      <span className="text-[11px] font-medium tracking-wide text-zinc-500">
        {label}
      </span>

      <div className="mt-1.5 flex h-10 items-center gap-2 rounded-lg border border-zinc-200/80 bg-white px-3 shadow-sm shadow-zinc-900/[0.02] transition focus-within:border-emerald-400/80 focus-within:ring-2 focus-within:ring-emerald-500/10">
        <Lock
          className="h-4 w-4 shrink-0 text-emerald-700/70"
          strokeWidth={2}
        />

        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          className="min-w-0 flex-1 bg-transparent text-[15px] text-zinc-900 outline-none placeholder:text-zinc-400 disabled:opacity-60"
        />

        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          disabled={disabled}
          className="rounded-md p-2 text-emerald-700/75 transition hover:bg-emerald-50/80 disabled:opacity-50"
          aria-label={visible ? "Parolni yashirish" : "Parolni ko‘rsatish"}
        >
          {visible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    </label>
  );
}

function RuleRow({
  met,
  label,
  optional,
}: {
  met: boolean;
  label: string;
  optional?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5 text-sm">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center">
        {met ? (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100/90 text-emerald-800">
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
        ) : (
          <Circle className="h-4 w-4 text-zinc-200" strokeWidth={2} />
        )}
      </span>

      <span
        className={cn(
          "text-left",
          met ? "font-medium text-zinc-800" : "text-zinc-500",
        )}
      >
        {label}
        {optional && (
          <span className="ml-1 text-xs font-normal text-zinc-400">
            (ixtiyoriy)
          </span>
        )}
      </span>
    </div>
  );
}
