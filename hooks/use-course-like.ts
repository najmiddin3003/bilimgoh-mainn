"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/providers/auth-provider";
import type { PublicAuthUser } from "@/lib/auth-user";

export function useCourseLike(courseId: number) {
  const router = useRouter();
  const { user, isAuthenticated, setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const liked = Boolean(user?.likedCourseIds?.includes(courseId));

  const toggle = useCallback(async () => {
    if (!isAuthenticated) {
      router.push("/auth");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/liked-courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ courseId }),
      });

      const data = (await res.json()) as {
        error?: string;
        user?: PublicAuthUser;
        liked?: boolean;
      };

      if (!res.ok) {
        console.error(data.error ?? "Yoqtirish amalga oshmadi");
        return;
      }

      if (data.user) {
        setUser(data.user);
      }
    } catch {
      console.error("Yoqtirishda tarmoq xatolik");
    } finally {
      setLoading(false);
    }
  }, [courseId, isAuthenticated, router, setUser]);

  return { liked, toggle, loading, isAuthenticated };
}
