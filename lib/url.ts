import { NEXT_PUBLIC_VERCEL_URL, VERCEL_URL } from "./config";

export function serverUrl() {
  if (VERCEL_URL) {
    return `https://${VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

export function clientUrl() {
  if (NEXT_PUBLIC_VERCEL_URL) {
    return `https://${NEXT_PUBLIC_VERCEL_URL}`;
  }

  return "http://localhost:3000";
}
