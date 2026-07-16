"use client";

import { useState, type FormEvent } from "react";
import { Mail, MessageCircle, Send, Store } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { businessInfo } from "@/lib/brand/businessInfo";
import { contactFieldLimits } from "@/lib/forms/limits";

type FormState = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/contact", {
      body: JSON.stringify({
        email: formData.get("email"),
        message: formData.get("message"),
        name: formData.get("name"),
        orderSupport: formData.get("orderSupport") === "on",
        productQuestion: formData.get("productQuestion") === "on",
        wholesale: formData.get("wholesale") === "on",
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;
      setError(data?.error ?? "Please check the form and try again.");
      setState("error");
      return;
    }

    form.reset();
    setState("sent");
  }

  return (
    <section className="seed-card rounded-seed p-5 md:p-6">
      <div className="flex items-start gap-3">
        <MessageCircle
          aria-hidden
          className="mt-1 size-7 shrink-0 text-forest-700"
        />
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-clay">
            Send a Message
          </p>
          <h2 className="mt-2 font-display text-3xl font-black text-forest-900">
            Have Questions? Let&apos;s Chat.
          </h2>
          <p className="mt-3 leading-7 text-forest-900/72">
            Ask about products, order review, wholesale, lab results, or farm
            support. The farm will reply by email.
          </p>
        </div>
      </div>

      <form className="mt-6 grid gap-4" onSubmit={submitContact}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-black text-forest-900">Name</span>
            <input
              className="focus-ring mt-2 min-h-12 w-full rounded-2xl border border-forest-900/15 bg-white/75 px-4 text-sm font-semibold text-forest-900"
              maxLength={contactFieldLimits.name}
              name="name"
              required
            />
          </label>
          <label className="block">
            <span className="text-sm font-black text-forest-900">Email</span>
            <input
              className="focus-ring mt-2 min-h-12 w-full rounded-2xl border border-forest-900/15 bg-white/75 px-4 text-sm font-semibold text-forest-900"
              maxLength={contactFieldLimits.email}
              name="email"
              required
              type="email"
            />
          </label>
        </div>

        <fieldset>
          <legend className="text-sm font-black text-forest-900">
            What can we help with?
          </legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <TopicCheckbox label="Product question" name="productQuestion" />
            <TopicCheckbox label="Order support" name="orderSupport" />
            <TopicCheckbox label="Wholesale" name="wholesale" />
          </div>
        </fieldset>

        <label className="block">
          <span className="text-sm font-black text-forest-900">Message</span>
          <textarea
            className="focus-ring mt-2 min-h-36 w-full rounded-2xl border border-forest-900/15 bg-white/75 px-4 py-3 text-sm font-semibold text-forest-900"
            maxLength={contactFieldLimits.message}
            name="message"
            required
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button disabled={state === "sending"} size="lg" type="submit">
            <Send aria-hidden className="size-5" />
            {state === "sending" ? "Sending..." : "Send Message"}
          </Button>
          <a
            className="focus-ring inline-flex items-center gap-2 rounded-full px-2 py-2 text-sm font-black text-clay underline decoration-clay/35 underline-offset-4 hover:text-forest-900"
            href={businessInfo.emailHref}
          >
            <Mail aria-hidden className="size-4" />
            {businessInfo.email}
          </a>
        </div>

        {state === "sent" && (
          <p className="rounded-2xl border border-forest-700/20 bg-forest-50 p-4 text-sm font-bold leading-6 text-forest-900">
            Thanks for reaching out. Your message was received, and the farm
            will reply by email.
          </p>
        )}
        {state === "error" && (
          <p className="rounded-2xl border border-clay/20 bg-clay/10 p-4 text-sm font-bold leading-6 text-forest-900">
            {error}
          </p>
        )}
      </form>

      <div className="mt-6 rounded-2xl border border-forest-900/10 bg-white/55 p-4 text-sm leading-6 text-forest-900/72">
        <p className="flex items-center gap-2 font-black text-forest-900">
          <Store aria-hidden className="size-4 text-clay" />
          Helpful details to include
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Whether you need product help, order support, or wholesale info.</li>
          <li>Any order number or product name involved.</li>
          <li>For lab questions, include the batch number if you have it.</li>
        </ul>
      </div>
    </section>
  );
}

function TopicCheckbox({ label, name }: { label: string; name: string }) {
  return (
    <label className="glass-card flex cursor-pointer items-center gap-2 rounded-2xl px-3 py-2 text-sm font-bold text-forest-900/80">
      <input className="size-4 accent-forest-700" name={name} type="checkbox" />
      {label}
    </label>
  );
}
