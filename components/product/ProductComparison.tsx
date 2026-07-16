import Link from "next/link";
import {
  getCoaStatusLabel,
  getProductStatusBadges,
  isAvailableNow,
  isSoldOut,
} from "@/lib/products/status";
import type { Product } from "@/lib/products/types";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { ProductPrice } from "./ProductPrice";

export function ProductComparison({
  products,
  showFinderCta = true,
  title = "Compare the Farm Shelf",
}: {
  products: Product[];
  showFinderCta?: boolean;
  title?: string;
}) {
  const comparisonProducts = getComparisonProducts(products);

  if (comparisonProducts.length === 0) return null;

  return (
    <section aria-labelledby="compare-farm-shelf">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-clay">
            Product guide
          </p>
          <h2
            className="mt-2 font-display text-3xl font-black text-forest-900 md:text-5xl"
            id="compare-farm-shelf"
          >
            {title}
          </h2>
          <p className="mt-3 max-w-3xl leading-7 text-forest-900/72">
            Compare formats by preference, label clarity, COA status, and
            availability. This table is product guidance only, not medical
            advice.
          </p>
        </div>
        {showFinderCta && (
          <ButtonLink href="/product-finder" variant="ghost">
            Open Product Guide
          </ButtonLink>
        )}
      </div>

      <div className="mt-7 hidden overflow-hidden rounded-seed border border-forest-900/12 bg-cream-50 shadow-soft lg:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-forest-700 text-cream-50">
            <tr>
              <Th>Product</Th>
              <Th>Format</Th>
              <Th>Best for</Th>
              <Th>CBG focus</Th>
              <Th>THC / intoxicating note</Th>
              <Th>COA status</Th>
              <Th>Availability</Th>
              <Th>CTA</Th>
            </tr>
          </thead>
          <tbody>
            {comparisonProducts.map((product) => (
              <tr
                className="border-b border-forest-900/10 last:border-b-0"
                key={product.id}
              >
                <Td>
                  <Link
                    className="focus-ring inline-flex rounded font-black text-forest-900 hover:text-clay"
                    href={`/product/${product.slug}`}
                  >
                    {product.name}
                  </Link>
                  <div className="mt-2">
                    <ProductPrice
                      product={product}
                      showCompareAt={false}
                      size="sm"
                    />
                  </div>
                </Td>
                <Td>{formatLabel(product)}</Td>
                <Td>{bestFor(product)}</Td>
                <Td>{cbgFocus(product)}</Td>
                <Td>
                  Non-intoxicating hemp positioning. Review the label and COA
                  status before ordering.
                </Td>
                <Td>
                  <Badge tone={getCoaStatusLabel(product) === "COA Available" ? "green" : "gold"}>
                    {getCoaStatusLabel(product)}
                  </Badge>
                </Td>
                <Td>
                  <Badge
                    tone={isAvailableNow(product) ? "green" : isSoldOut(product) ? "red" : "dark"}
                  >
                    {isAvailableNow(product)
                      ? "Available Now"
                      : isSoldOut(product)
                        ? "Sold Out"
                        : "Coming Soon"}
                  </Badge>
                </Td>
                <Td>
                  <ButtonLink
                    href={`/product/${product.slug}`}
                    size="sm"
                    variant={isAvailableNow(product) ? "primary" : "ghost"}
                  >
                    {isAvailableNow(product) ? "View" : "Details"}
                  </ButtonLink>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-7 grid gap-4 lg:hidden">
        {comparisonProducts.map((product) => (
          <article
            className="seed-card rounded-seed p-5"
            key={product.id}
          >
            <div className="flex flex-wrap gap-2">
              {getProductStatusBadges(product).map((badge) => (
                <Badge key={badge.label} tone={badge.tone}>
                  {badge.label}
                </Badge>
              ))}
            </div>
            <h3 className="mt-4 font-display text-2xl font-black text-forest-900">
              {product.name}
            </h3>
            <dl className="mt-4 grid gap-3 text-sm">
              <MobileField label="Format">{formatLabel(product)}</MobileField>
              <MobileField label="Best for">{bestFor(product)}</MobileField>
              <MobileField label="CBG focus">{cbgFocus(product)}</MobileField>
              <MobileField label="Note">
                Non-intoxicating hemp positioning. Review label and COA status.
              </MobileField>
            </dl>
            <ButtonLink
              className="mt-5"
              href={`/product/${product.slug}`}
              variant={isAvailableNow(product) ? "primary" : "ghost"}
            >
              View Details
            </ButtonLink>
          </article>
        ))}
      </div>
    </section>
  );
}

function getComparisonProducts(products: Product[]) {
  const wantedCategories = [
    "CBG Gummies",
    "Capsules",
    "CBG Oils",
    "Hemp Flower",
    "Seeds",
  ];

  const selected: Product[] = [];

  for (const category of wantedCategories) {
    const product = products.find((item) => item.category === category);
    if (product) selected.push(product);
  }

  const mega = products.find((item) => item.slug === "mega-cbg-gummy-bear");
  if (mega && !selected.some((item) => item.id === mega.id)) {
    selected.splice(1, 0, mega);
  }

  return selected.slice(0, 7);
}

function formatLabel(product: Product) {
  if (product.category === "CBG Gummies") return "Gummy";
  if (product.category === "CBG Oils") return "Oil";
  if (product.category === "Hemp Flower") return "Flower";
  return product.category;
}

function bestFor(product: Product) {
  if (product.category === "CBG Gummies") return "Familiar, pre-portioned adult routines";
  if (product.category === "Capsules") return "Measured capsule preference";
  if (product.category === "CBG Oils") return "Flexible serving format once label is final";
  if (product.category === "Hemp Flower") return "Plant-forward hemp flower experience";
  if (product.category === "Seeds") return "Seed and genetics planning";
  return "Browsing the farm shelf";
}

function cbgFocus(product: Product) {
  if (product.tags.includes("CBG") || product.category.includes("CBG")) {
    return product.cannabinoidInfo || "CBG-rich positioning; review final label.";
  }

  if (product.category === "Seeds") {
    return "Not a consumable cannabinoid product.";
  }

  return "Review product details.";
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-4 text-xs font-black uppercase tracking-[0.12em]">
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="align-top px-4 py-5 leading-6 text-forest-900/72">{children}</td>;
}

function MobileField({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-forest-900/10 bg-white/55 p-3">
      <dt className="text-xs font-black uppercase tracking-[0.14em] text-clay">
        {label}
      </dt>
      <dd className="mt-1 font-semibold leading-6 text-forest-900/72">
        {children}
      </dd>
    </div>
  );
}
