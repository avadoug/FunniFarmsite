import path from "path";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { contactFieldLimits } from "@/lib/forms/limits";
import { sanitizeEmail, sanitizeText } from "@/lib/utils/sanitize";
import { readJsonArrayFile, writeJsonFile } from "@/lib/utils/json-file";
import { isProductionRuntime } from "@/lib/runtime/production";
import {
  checkRateLimit,
  isSameOriginRequest,
  rateLimitHeaders,
} from "@/lib/security/rate-limit";

const DATA_PATH = path.join(
  process.cwd(),
  "data",
  "contact-submissions.local.json",
);

const contactSchema = z.object({
  name: z.string().min(1).max(contactFieldLimits.name),
  email: z.string().email().max(contactFieldLimits.email),
  message: z.string().min(1).max(contactFieldLimits.message),
  wholesale: z.boolean().default(false),
  productQuestion: z.boolean().default(false),
  orderSupport: z.boolean().default(false),
});

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const rateLimit = checkRateLimit(request, {
    keyPrefix: "contact",
    limit: 6,
    windowMs: 10 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many messages were sent. Please wait and try again." },
      { headers: rateLimitHeaders(rateLimit), status: 429 },
    );
  }

  const parsed = contactSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please complete the contact form." },
      { status: 400 },
    );
  }

  const submission = {
    id: `contact_${crypto.randomUUID()}`,
    name: sanitizeText(parsed.data.name, contactFieldLimits.name),
    email: sanitizeEmail(parsed.data.email),
    message: sanitizeText(parsed.data.message, contactFieldLimits.message),
    wholesale: parsed.data.wholesale,
    productQuestion: parsed.data.productQuestion,
    orderSupport: parsed.data.orderSupport,
    createdAt: new Date().toISOString(),
  };

  const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT?.trim();

  if (formspreeEndpoint) {
    const response = await fetch(formspreeEndpoint, {
      body: JSON.stringify(submission),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            "The message service could not be reached. Please email the farm directly.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Thanks for reaching out. The farm will reply by email.",
    });
  }

  if (isProductionRuntime()) {
    return NextResponse.json(
      {
        error:
          "Contact form delivery is not configured yet. Please email the farm directly.",
      },
      { status: 501 },
    );
  }

  const submissions = await readJsonArrayFile<unknown>(DATA_PATH);
  submissions.push(submission);
  await writeJsonFile(DATA_PATH, submissions);

  return NextResponse.json({
    ok: true,
    message: "Thanks for reaching out. The farm will reply by email.",
  });
}
