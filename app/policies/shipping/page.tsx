import type { Metadata } from "next";
import { PolicyPage } from "@/components/layout/PolicyPage";
import { getPolicy } from "@/lib/policies/content";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description:
    "The Funni Farm shipping policy for processing times, tracking, incorrect addresses, carrier delays, and legal shipping locations.",
};

export default function ShippingPage() {
  return <PolicyPage policy={getPolicy("shipping")!} />;
}
