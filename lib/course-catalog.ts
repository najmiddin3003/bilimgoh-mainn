import courses from "@/constants";

export type CatalogCourse = (typeof courses)[number];

export function getCourseById(id: number): CatalogCourse | undefined {
  return courses.find((c) => c.id === id);
}

export function isValidCourseId(id: number): boolean {
  return courses.some((c) => c.id === id);
}

export function parseCourseId(value: unknown): number | null {
  const n =
    typeof value === "string"
      ? Number.parseInt(value, 10)
      : typeof value === "number"
        ? value
        : Number.NaN;

  if (!Number.isFinite(n)) return null;
  return isValidCourseId(n) ? n : null;
}

export function normalizeLikedCourseIds(ids: unknown): number[] {
  if (!Array.isArray(ids)) return [];
  const unique = new Set<number>();
  for (const id of ids) {
    const n = typeof id === "number" ? id : Number.parseInt(String(id), 10);
    if (Number.isFinite(n) && isValidCourseId(n)) {
      unique.add(n);
    }
  }
  return [...unique];
}

export function resolveLikedCourses(ids: number[]): CatalogCourse[] {
  return ids
    .map((id) => getCourseById(id))
    .filter((c): c is CatalogCourse => Boolean(c));
}
