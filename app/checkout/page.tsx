import type { Metadata } from "next";
import { CheckoutForm } from "@/components/forms/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Send a secure Funni Farm order request without collecting raw credit-card information.",
};

export default function CheckoutPage() {
  return <CheckoutForm />;
}
