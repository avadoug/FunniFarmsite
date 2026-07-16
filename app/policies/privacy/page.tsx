import type { Metadata } from "next";
import { PolicyPage } from "@/components/layout/PolicyPage";
import { getPolicy } from "@/lib/policies/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "The Funni Farm privacy policy for order requests, contact information, cookies, and customer information safeguards.",
};

export default function PrivacyPage() {
  return <PolicyPage policy={getPolicy("privacy")!} />;
}
