export type LabelCallout = {
  label: string;
  value: string;
};

export type NutritionFact = {
  label: string;
  value: string;
  dailyValue?: string;
};

export type ProductLabelFacts = {
  slug: string;
  title: string;
  eyebrow: string;
  image: string;
  imageAlt: string;
  logoImage: string;
  logoImageAlt: string;
  complianceImage: string;
  complianceImageAlt: string;
  brandLine: string;
  summary: string;
  callouts: LabelCallout[];
  labelBadges: string[];
  batchFields: string[];
  scanFor: string[];
  ingredients: string[];
  allergens: string[];
  suggestedUse: string[];
  storage: string;
  manufacturedBy: string[];
  labTransparency: string;
  nutrition: NutritionFact[];
  nutritionFootnote: string;
  complianceNotes: string[];
};

export const productLabelFacts: Record<string, ProductLabelFacts> = {
  "funni-farm-cbg-gummies": {
    slug: "funni-farm-cbg-gummies",
    title: "Label-backed gummy details",
    eyebrow: "From the attached product label",
    image: "/images/products/funni-farm-cbg-gummies-front-logo.webp",
    imageAlt: "FunniFarms CBG Gummies label",
    logoImage: "/images/products/funni-farm-cbg-gummies-front-logo.webp",
    logoImageAlt: "FunniFarms CBG Gummies label",
    complianceImage: "/images/products/funni-farm-cbg-gummies-compliance-strip.webp",
    complianceImageAlt:
      "The Funni Farm CBG Gummies bottom label strip showing hemp-derived and 21+ adult-use details.",
    brandLine: "Family Crafted in Tennessee",
    summary:
      "The attached Funni Farm CBG Gummies label gives this listing real serving, ingredient, nutrition, storage, and adult-use details while final batch numbers and COA links are still being connected.",
    callouts: [
      { label: "CBG per gummy", value: "2-3 mg" },
      { label: "Total CBG per bag", value: "100-150 mg" },
      { label: "Count", value: "50 gummies" },
      { label: "Serving size", value: "1 gummy (10 g)" },
      { label: "Flavor", value: "Mixed fruit flavors" },
      { label: "Net weight", value: "4.4 oz (125 g)" },
    ],
    labelBadges: [
      "Hemp derived",
      "Family owned & operated",
      "Farm to plate",
      "COA scan area",
      "21+ only",
      "Thank you for supporting our family farm",
    ],
    batchFields: ["Lot #", "Batch #", "MFG Date", "Best By"],
    scanFor: [
      "Certificate of Analysis (COA)",
      "Cannabinoid Profile",
      "Third-Party Lab Results",
    ],
    ingredients: [
      "Water",
      "Corn syrup",
      "MCT oil (hemp-derived CBG extract)",
      "Gelatin",
      "Natural and artificial flavors",
      "Citric acid",
      "Guar gum",
      "Malic acid",
      "Potassium sorbate (preservative)",
      "Sodium benzoate (preservative)",
    ],
    allergens: [
      "Contains coconut from MCT oil.",
      "This product may contain allergens.",
      "Keep out of reach of children.",
    ],
    suggestedUse: [
      "Adults: begin with one gummy.",
      "Wait at least two hours before consuming additional servings.",
      "Individual responses vary.",
    ],
    storage: "Store in a cool, dry place away from sunlight.",
    manufacturedBy: [
      "The Funni Farm",
      "Woodlawn, TN",
      "(931) 551-0899",
    ],
    labTransparency:
      "The label includes a scan area for Certificate of Analysis, cannabinoid profile, and third-party lab results. A current batch COA should be linked before this gummy listing is opened for live ordering.",
    nutrition: [
      { label: "Calories", value: "25" },
      { label: "Total fat", value: "1.5 g", dailyValue: "2%" },
      { label: "Saturated fat", value: "1 g", dailyValue: "5%" },
      { label: "Trans fat", value: "0 g" },
      { label: "Cholesterol", value: "0 mg", dailyValue: "0%" },
      { label: "Sodium", value: "0 mg", dailyValue: "0%" },
      { label: "Total carbohydrate", value: "4 g", dailyValue: "1%" },
      { label: "Total sugars", value: "3 g" },
      { label: "Added sugars", value: "3 g", dailyValue: "6%" },
      { label: "Protein", value: "0 g" },
    ],
    nutritionFootnote:
      "Not a significant source of vitamin D, calcium, iron, and potassium.",
    complianceNotes: [
      "Adult use only.",
      "Hemp-derived product with label language referencing less than 0.3% Delta-9 THC on a dry-weight basis.",
      "The label states the product was produced at a private residence that is exempt from state licensing and inspection.",
      "The label states the product may contain allergens.",
      "Not intended to diagnose, treat, cure, or prevent any disease.",
      "Do not use if pregnant or nursing. Consult a physician before use if you have a medical condition or take medication.",
    ],
  },
};
