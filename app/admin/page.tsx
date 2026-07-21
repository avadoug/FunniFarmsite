import type { Metadata } from "next";
import { AdminProductManager } from "@/components/forms/AdminProductManager";

export const metadata: Metadata = {
  title: "Store Admin",
  description:
    "Private order review and starter catalog management for The Funni Farm.",
  robots: {
    follow: false,
    index: false,
  },
};

export default function AdminPage() {
  return <AdminProductManager />;
}
