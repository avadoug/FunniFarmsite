import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/products/repository";
import { policies } from "@/lib/policies/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thefunnifarm.com";
  const products = await getProducts();
  const staticRoutes = [
    "",
    "/shop",
    "/cart",
    "/checkout",
    "/about",
    "/faq",
    "/product-finder",
    "/learn",
    "/learn/what-is-cbg",
    "/cbg",
    "/lab-results",
    "/contact",
    "/policies",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })),
    ...products.map((product) => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: new Date(product.updatedAt),
    })),
    ...policies.map((policy) => ({
      url: `${baseUrl}/policies/${policy.slug}`,
      lastModified: new Date(),
    })),
  ];
}
