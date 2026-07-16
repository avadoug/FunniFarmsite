import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const nextCachePath = path.resolve(projectRoot, ".next");

if (!nextCachePath.startsWith(projectRoot + path.sep)) {
  throw new Error(`Refusing to remove unexpected path: ${nextCachePath}`);
}

if (fs.existsSync(nextCachePath)) {
  fs.rmSync(nextCachePath, { force: true, recursive: true });
  console.log(`Removed generated Next.js cache: ${path.relative(projectRoot, nextCachePath)}`);
} else {
  console.log("No generated Next.js cache to remove.");
}
