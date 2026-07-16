import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const projectRoot = process.cwd();

const requiredFiles = [
  "package.json",
  "package-lock.json",
  "next.config.js",
  "tsconfig.json",
  "vercel.json",
  "app/layout.tsx",
  "app/page.tsx",
  "data/products.json",
  "lib/utils/cn.ts",
  "lib/utils/format.ts",
  "lib/products/repository.ts",
  "lib/products/types.ts",
  "components/cart/CartProvider.tsx",
  "components/product/ProductCard.tsx",
  "components/brand/TrustBar.tsx",
];

const forbiddenPublicFiles = [
  "public/images/coa/jack-frost-cbg-001-new-bloom-labs-full.webp",
  "public/images/coa/jack-frost-cbg-001-new-bloom-labs-preview.webp",
  "public/images/products/funni-farm-cbg-gummies-label-card.webp",
  "public/images/products/funni-farm-cbg-gummies-label-full.webp",
  "public/images/products/funni-farm-cbg-gummies-label-facts.webp",
];

const textExtensions = new Set([
  ".css",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mjs",
  ".ts",
  ".tsx",
  ".txt",
  ".yml",
  ".yaml",
]);

const skippedDirectories = new Set([
  ".git",
  ".next",
  ".vercel",
  "node_modules",
]);

const forbiddenText = [
  {
    label: "exact street address",
    pattern: /3610\s+Lewis\s+Atkins/i,
  },
  {
    label: "full Woodlawn address with ZIP",
    pattern: /Woodlawn,\s*TN\s*37191/i,
  },
];

const failures = [];
const warnings = [];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(projectRoot, file))) {
    failures.push(`Missing required deploy file: ${file}`);
  }
}

for (const file of forbiddenPublicFiles) {
  if (fs.existsSync(path.join(projectRoot, file))) {
    failures.push(
      `Remove protected-address source image before deploy: ${file}`,
    );
  }
}

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!skippedDirectories.has(entry.name)) {
        walk(path.join(directory, entry.name));
      }
      continue;
    }

    const filePath = path.join(directory, entry.name);
    const relativePath = path.relative(projectRoot, filePath);
    const extension = path.extname(entry.name).toLowerCase();

    if (!textExtensions.has(extension)) {
      continue;
    }

    if (
      relativePath === "package-lock.json" ||
      relativePath === "tsconfig.tsbuildinfo" ||
      relativePath.startsWith("logs" + path.sep)
    ) {
      continue;
    }

    const content = fs.readFileSync(filePath, "utf8");

    for (const rule of forbiddenText) {
      if (rule.pattern.test(content)) {
        failures.push(
          `Found ${rule.label} in ${relativePath}. Use "Woodlawn, TN" publicly.`,
        );
      }
    }
  }
}

walk(projectRoot);

const envExample = fs.existsSync(path.join(projectRoot, ".env.example"))
  ? fs.readFileSync(path.join(projectRoot, ".env.example"), "utf8")
  : "";

if (/sk_live_|pk_live_|re_[A-Za-z0-9]{20,}/.test(envExample)) {
  failures.push(".env.example appears to contain a real API key.");
}

if (!fs.existsSync(path.join(projectRoot, ".git"))) {
  warnings.push(
    "This folder is not initialized as a Git repository yet. Vercel should import a real GitHub repo containing these files.",
  );
} else {
  try {
    execFileSync("git", ["status", "--short"], {
      cwd: projectRoot,
      stdio: "ignore",
    });
  } catch {
    warnings.push(
      "A .git item exists, but Git does not recognize this folder as a repository. Reinitialize Git before pushing to GitHub.",
    );
  }
}

if (failures.length > 0) {
  console.error("Deployment audit failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Deployment audit passed.");

if (warnings.length > 0) {
  console.warn("Deployment notes:");
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
}
