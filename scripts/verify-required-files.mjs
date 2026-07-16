import fs from "node:fs";
import path from "node:path";

const requiredFiles = [
  "lib/utils/cn.ts",
  "lib/utils/format.ts",
  "lib/utils/sanitize.ts",
  "lib/utils/slugify.ts",
  "components/brand/TrustBar.tsx",
  "components/cart/CartProvider.tsx",
];

const missing = requiredFiles.filter(
  (file) => !fs.existsSync(path.resolve(process.cwd(), file)),
);

if (missing.length > 0) {
  throw new Error(
    [
      "Required project files are missing. Make sure these files/folders were uploaded to GitHub:",
      ...missing.map((file) => `- ${file}`),
    ].join("\n"),
  );
}

console.log("Required project files verified.");
