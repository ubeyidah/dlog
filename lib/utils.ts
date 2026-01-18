import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const randomNumber = () => Math.random()


export const bytesToMB = (bytes: number, decimals = 2): number => {
  if (!bytes) return 0
  return parseFloat((bytes / (1024 * 1024)).toFixed(decimals))
}
