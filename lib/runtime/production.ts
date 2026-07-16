export const PRODUCTION_DATABASE_MESSAGE =
  "Production database is not configured yet. Connect Supabase or another database before using this feature live.";

export function isProductionRuntime() {
  return process.env.NODE_ENV === "production";
}

export function assertDevelopmentWrite() {
  if (isProductionRuntime()) {
    throw new Error(PRODUCTION_DATABASE_MESSAGE);
  }
}
