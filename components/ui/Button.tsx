import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "dark" | "danger";
type ButtonSize = "sm" | "md" | "lg" | "icon";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-forest-700 text-cream-50 shadow-soft hover:bg-forest-900 border border-forest-900",
  secondary:
    "bg-harvest-300 text-forest-900 hover:bg-harvest-100 border border-harvest-700/40",
  ghost:
    "bg-transparent text-forest-900 hover:bg-forest-700/10 border border-forest-700/20",
  dark: "bg-ink text-cream-50 hover:bg-forest-900 border border-cream-100/20",
  danger: "bg-clay text-cream-50 hover:bg-clay/90 border border-clay",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3 py-2 text-sm",
  md: "min-h-11 px-4 py-2.5 text-sm",
  lg: "min-h-12 px-5 py-3 text-base",
  icon: "size-10 p-0",
};

const base =
  "focus-ring relative inline-flex items-center justify-center gap-2 rounded-full font-bold transition disabled:pointer-events-none disabled:opacity-55";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function ButtonLink({
  className,
  variant = "primary",
  size = "md",
  href,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(base, variants[variant], sizes[size], className)}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
}
