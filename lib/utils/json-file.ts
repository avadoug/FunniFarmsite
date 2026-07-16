import { promises as fs } from "fs";

export async function readJsonArrayFile<T>(filePath: string) {
  const raw = await fs.readFile(filePath, "utf8").catch((error: unknown) => {
    if (isMissingFile(error)) return "[]";
    throw error;
  });
  const parsed = JSON.parse(raw) as unknown;

  if (!Array.isArray(parsed)) {
    throw new Error(`${filePath} must contain a JSON array.`);
  }

  return parsed as T[];
}

export async function writeJsonFile(filePath: string, value: unknown) {
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function isMissingFile(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "ENOENT"
  );
}
