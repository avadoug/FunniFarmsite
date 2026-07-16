import type { Metadata } from "next";
import { AdminProductManager } from "@/components/forms/AdminProductManager";

export const metadata: Metadata = {
  title: "Admin Product Management",
  description:
    "Local-only product management starter for The Funni Farm catalog.",
  robots: {
    follow: false,
    index: false,
  },
};

export default function AdminPage() {
  return <AdminProductManager />;
}
