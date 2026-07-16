import type { Metadata } from "next";
import { PolicyPage } from "@/components/layout/PolicyPage";
import { getPolicy } from "@/lib/policies/content";

export const metadata: Metadata = {
  title: "Hemp Compliance Policy",
};

export default function HempCompliancePage() {
  return <PolicyPage policy={getPolicy("hemp-compliance")!} />;
}
