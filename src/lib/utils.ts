import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function randomInt(min = 0, max = 1000) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function randomFloat(min = 0, max = 1000, decimalPlaces = 1) {
  const randomFloat = Math.random() * (max - min) + min;

  const multiplier = Math.pow(10, decimalPlaces);
  return Math.floor(randomFloat * multiplier) / multiplier;
}