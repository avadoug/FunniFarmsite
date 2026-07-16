import type { Metadata } from "next";
import { CartPageClient } from "@/components/cart/CartPageClient";

export const metadata: Metadata = {
  title: "Cart",
  description:
    "Review and edit your Funni Farm cart before sending an order request.",
};

export default function CartPage() {
  return <CartPageClient />;
}
