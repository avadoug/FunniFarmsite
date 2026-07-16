import Link from "next/link";
import { BadgeCheck, Facebook, Instagram, Mail, MapPin, Music2, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { businessInfo } from "@/lib/brand/businessInfo";

const linkGroups = [
  {
    title: "Shop",
    links: [
      ["All Products", "/shop"],
      ["Gummies", "/shop?category=CBG%20Gummies"],
      ["Oils", "/shop?category=CBG%20Oils"],
      ["Capsules", "/shop?category=Capsules"],
      ["Seeds", "/shop?category=Seeds"],
    ],
  },
  {
    title: "Learn",
    links: [
      ["What is CBG?", "/learn/what-is-cbg"],
      ["CBG vs CBD vs THC", "/#what-is-cbg"],
      ["Product Finder", "/product-finder"],
      ["Responsible Use", "/policies/responsible-use"],
      ["FAQs", "/faq"],
    ],
  },
  {
    title: "About",
    links: [
      ["Our Story", "/about"],
      ["Our Farm", "/about#farm-gallery"],
      ["Hershey's Story", "/about#hershey"],
      ["Sustainability", "/policies/sustainability"],
    ],
  },
  {
    title: "Support",
    links: [
      ["Lab Results", "/lab-results"],
      ["Batch Transparency", "/#batch-transparency"],
      ["Shipping & Returns", "/policies/shipping"],
      ["Terms", "/policies/terms"],
      ["Privacy", "/policies/privacy"],
      ["Contact Us", "/contact"],
    ],
  },
] as const;

const socials = [
  { href: "https://www.instagram.com/", label: "Instagram", icon: Instagram },
  { href: "https://www.facebook.com/", label: "Facebook", icon: Facebook },
  { href: "https://www.tiktok.com/", label: "TikTok", icon: Music2 },
  { href: businessInfo.emailHref, label: "Email", icon: Mail },
] as const;

export function Footer() {
  return (
    <footer className="mt-20 border-t border-forest-900/12 bg-cream-50 text-forest-900">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.25fr_repeat(4,.72fr)_1fr] lg:px-8">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-sm font-semibold leading-6 text-forest-900/70">
            Family-crafted hemp wellness from our farm to your family. Rooted in
            Tennessee, committed to clear labels and careful order review.
          </p>
          <div className="mt-5 flex gap-2">
            {socials.map((social) => (
              <a
                aria-label={social.label}
                className="focus-ring flex size-10 items-center justify-center rounded-full border border-forest-900/14 bg-white/70 text-forest-900 hover:bg-forest-700 hover:text-cream-50"
                href={social.href}
                key={social.label}
              >
                <social.icon aria-hidden className="size-4" />
              </a>
            ))}
          </div>
          <div className="mt-5 grid gap-2 text-sm font-bold text-forest-900/68">
            <a className="inline-flex items-center gap-2 hover:text-clay" href={businessInfo.emailHref}>
              <Mail aria-hidden className="size-4 text-clay" />
              {businessInfo.email}
            </a>
            <a className="inline-flex items-center gap-2 hover:text-clay" href={businessInfo.phoneHref}>
              <Phone aria-hidden className="size-4 text-clay" />
              {businessInfo.phone}
            </a>
            <p className="inline-flex items-center gap-2">
              <MapPin aria-hidden className="size-4 text-clay" />
              {businessInfo.addressInline}
            </p>
          </div>
        </div>

        {linkGroups.map((group) => (
          <FooterColumn
            key={group.title}
            links={group.links}
            title={group.title}
          />
        ))}

        <div className="flex flex-col items-start lg:items-center">
          <div className="flex size-32 flex-col items-center justify-center rounded-full border border-forest-900/18 bg-cream-100 text-center shadow-soft">
            <BadgeCheck aria-hidden className="size-8 text-clay" />
            <p className="mt-2 font-display text-lg font-black leading-none">
              Tennessee
            </p>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-clay">
              Proud
            </p>
          </div>
          <p className="mt-4 max-w-[12rem] text-center font-display text-lg italic leading-6 text-forest-900/72">
            Thank you for supporting our family farm.
          </p>
        </div>
      </div>
      <div className="border-t border-forest-900/10 px-4 py-5">
        <div className="mx-auto grid max-w-7xl gap-4 text-xs font-semibold leading-6 text-forest-900/72 lg:grid-cols-[1fr_auto] lg:items-center">
          <p className="max-w-4xl">
            These products are not intended to diagnose, treat, cure, or prevent
            any disease. Effects vary by person. Consult a qualified
            professional before use if pregnant, nursing, taking medication, or
            managing a medical condition. Keep out of reach of children. Use
            only as directed.
          </p>
          <div className="flex flex-col gap-2 lg:items-end">
            <p>© {new Date().getFullYear()} The Funni Farm.</p>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              <Link className="hover:text-clay" href="/policies/terms">
                Terms
              </Link>
              <Link className="hover:text-clay" href="/policies/privacy">
                Privacy
              </Link>
              <Link className="hover:text-clay" href="/policies/disclaimer">
                Disclaimer
              </Link>
              <Link className="hover:text-clay" href="/policies/accessibility">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  links,
  title,
}: {
  links: readonly (readonly [string, string])[];
  title: string;
}) {
  return (
    <div>
      <h2 className="font-display text-lg font-black text-forest-900">{title}</h2>
      <ul className="mt-4 space-y-2">
        {links.map(([label, href]) => (
          <li key={`${title}-${label}`}>
            <Link
              className="focus-ring inline-flex rounded-full py-1 text-sm font-bold text-forest-900/66 hover:text-clay"
              href={href}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
