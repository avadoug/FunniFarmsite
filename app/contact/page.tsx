import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone, Store } from "lucide-react";
import { FarmNote } from "@/components/brand/FarmNote";
import { ContactForm } from "@/components/forms/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrustBar } from "@/components/brand/TrustBar";
import { businessInfo } from "@/lib/brand/businessInfo";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact The Funni Farm in Woodlawn, Tennessee for product questions, wholesale inquiries, and order support.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading as="h1" eyebrow="Say hello" title="Contact The Funni Farm">
        <p>
          Ask a product question, start a wholesale conversation, or request
          order support. You can email the farm directly at{" "}
          <a
            className="font-black text-clay underline decoration-clay/35 underline-offset-4 hover:text-forest-900"
            href={businessInfo.emailHref}
          >
            {businessInfo.email}
          </a>
          .
        </p>
      </SectionHeading>

      <div className="mt-7">
        <TrustBar compact />
      </div>

      <div className="mt-7">
        <FarmNote
          eyebrow="Support note"
          title="Product questions are welcome."
          tone="farm"
        >
          Use the form for product help, order support, wholesale questions, or
          lab-result questions. You can also email or call the farm directly.
        </FarmNote>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
        <aside className="space-y-4">
          <Info
            href={businessInfo.emailHref}
            icon={Mail}
            title="Business Email"
            value={businessInfo.email}
          />
          <Info
            href={businessInfo.phoneHref}
            icon={Phone}
            title="Business Phone"
            value={businessInfo.phone}
          />
          <Info
            icon={MapPin}
            title="Farm / Location"
            value={businessInfo.addressInline}
          />
          <Info
            icon={Store}
            title="Wholesale"
            value="Email the farm for retail, farm, or partner inquiries."
          />
          <div className="rounded-seed border border-forest-900/12 bg-forest-900 p-5 text-cream-50 shadow-soft">
            <MessageCircle aria-hidden className="size-6 text-harvest-300" />
            <h2 className="mt-3 font-display text-2xl font-black">
              Direct support for launch
            </h2>
            <p className="mt-2 text-sm leading-6 text-cream-100/75">
              The direct email above is ready to use. A website form can be
              turned on later after Resend, SendGrid, Formspree, Supabase, or
              another service is connected.
            </p>
          </div>
        </aside>
        <ContactForm />
      </div>
    </div>
  );
}

function Info({
  icon: Icon,
  href,
  title,
  value,
}: {
  href?: string;
  icon: typeof Mail;
  title: string;
  value: string;
}) {
  return (
    <div className="seed-card rounded-seed p-5">
      <Icon aria-hidden className="size-6 text-forest-700" />
      <h2 className="mt-3 font-display text-2xl font-black text-forest-900">
        {title}
      </h2>
      {href ? (
        <a
          className="mt-2 inline-flex text-sm font-black leading-6 text-clay underline decoration-clay/35 underline-offset-4 hover:text-forest-900"
          href={href}
        >
          {value}
        </a>
      ) : (
        <p className="mt-2 text-sm leading-6 text-forest-900/70">{value}</p>
      )}
    </div>
  );
}
