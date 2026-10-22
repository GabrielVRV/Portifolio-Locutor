import { twMerge } from "tailwind-merge";

/**
 * Joins conditional class names, skipping falsy values. Conflicting Tailwind
 * utilities are resolved in favour of the last one, so callers can override
 * a component's defaults (e.g. `absolute` over `relative`).
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return twMerge(classes.filter(Boolean).join(" "));
}
