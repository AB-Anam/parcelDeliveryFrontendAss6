// src/lib/utils.ts
import { clsx } from "clsx";

/**
 * Merge multiple class strings into one.
 * Similar to twMerge, but now using clsx only.
 */
export function cn(...inputs: Parameters<typeof clsx>) {
  return clsx(...inputs);
}
