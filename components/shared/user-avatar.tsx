"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { PublicAuthUser } from "@/lib/auth-user";

type UserAvatarProps = {
  user: PublicAuthUser;
  href?: string;
  size?: "sm" | "md";
  className?: string;
  onClick?: () => void;
};

const sizeClasses = {
  sm: "size-9 text-xs",
  md: "size-10 text-sm",
};

export default function UserAvatar({
  user,
  href = "/dashboard",
  size = "md",
  className,
  onClick,
}: UserAvatarProps) {
  const inner = (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 font-semibold text-white shadow-md shadow-emerald-500/25 ring-2 ring-white/80 dark:ring-gray-900/80",
        sizeClasses[size],
        className,
      )}
      title={user.phoneDisplay}
    >
      {user.initials}
    </span>
  );

  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-full transition hover:opacity-90"
    >
      {inner}
    </Link>
  );
}
