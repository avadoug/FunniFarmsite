import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PolicyPage } from "@/components/layout/PolicyPage";
import { getPolicy } from "@/lib/policies/content";

type PolicyRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PolicyRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const policy = getPolicy(slug);

  if (!policy) {
    return {
      title: "Policy Not Found",
    };
  }

  return {
    title: policy.title,
    description: policy.description,
  };
}

export default async function DynamicPolicyPage({ params }: PolicyRouteProps) {
  const { slug } = await params;
  const policy = getPolicy(slug);

  if (!policy) {
    notFound();
  }

  return <PolicyPage policy={policy} />;
}
