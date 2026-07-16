const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g;
const ANGLE_BRACKETS = /[<>]/g;

export function sanitizeText(value: unknown, maxLength = 2000) {
  if (typeof value !== "string") return "";

  return value
    .replace(CONTROL_CHARS, "")
    .replace(ANGLE_BRACKETS, "")
    .trim()
    .slice(0, maxLength);
}

export function sanitizeStringArray(value: unknown, maxItems = 12) {
  if (!Array.isArray(value)) return [];

  return value
    .slice(0, maxItems)
    .map((item) => sanitizeText(item, 80))
    .filter(Boolean);
}

export function sanitizeEmail(value: unknown) {
  return sanitizeText(value, 254).toLowerCase();
}

export function sanitizeLocalPath(value: unknown, maxLength = 400) {
  const text = sanitizeText(value, maxLength);

  if (!text.startsWith("/") || text.startsWith("//") || text.includes("\\")) {
    return "";
  }

  return text;
}
