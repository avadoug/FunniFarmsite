import { contentThreePolicies } from "./contentThree";

export type Policy = {
  slug: string;
  title: string;
  description: string;
  effectiveDate?: string;
  eyebrow?: string;
  isPlaceholder?: boolean;
  notice?: string;
  pdfUrl?: string;
  sections: {
    title: string;
    body: string;
  }[];
};

const reviewNotice =
  "This page is based on The Funni Farm's supplied PDF. Have it reviewed with final legal, label, and compliance guidance before live sales.";

const contactBlock =
  "The Funni Farm\nEmail: thefunnifarm@outlook.com\nPhone: (931) 551-0899\nWebsite: www.thefunnifarm.com";

export const policies: Policy[] = [
  {
    slug: "terms",
    title: "Terms & Conditions",
    effectiveDate: "January 1, 2026",
    eyebrow: "Policy document",
    isPlaceholder: false,
    description:
      "Terms for using The Funni Farm website and ordering hemp-derived products.",
    notice: reviewNotice,
    pdfUrl: "/policies/terms-and-conditions.pdf",
    sections: [
      {
        title: "Acceptance",
        body: "By using this website, you agree to these Terms & Conditions.",
      },
      {
        title: "Products",
        body: "All products are subject to availability and may be changed without notice.",
      },
      {
        title: "Pricing",
        body: "Prices are subject to change without notice. We reserve the right to refuse or cancel orders.",
      },
      {
        title: "Legal Compliance",
        body: "Customers are responsible for ensuring hemp-derived products are legal in their jurisdiction.",
      },
      {
        title: "Limitation of Liability",
        body: "The Funni Farm is not liable for indirect or consequential damages arising from the use of our products or website.",
      },
      {
        title: "Governing Law",
        body: "These terms are governed by the laws of the State of Tennessee.",
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    effectiveDate: "January 1, 2026",
    eyebrow: "Policy document",
    isPlaceholder: false,
    description:
      "Privacy policy for customer information, order requests, contact forms, and website use.",
    notice: reviewNotice,
    pdfUrl: "/policies/privacy-policy.pdf",
    sections: [
      {
        title: "Information We Collect",
        body: "We collect information you provide when placing orders or contacting us, including your name, address, email, phone number, and payment-related information needed to review or process your order.\n\nThe Funni Farm does not ask customers to submit raw credit card numbers through this website or by email.",
      },
      {
        title: "How We Use It",
        body: "We use information to process orders, communicate with you, improve our services, and comply with legal obligations.",
      },
      {
        title: "Data Protection",
        body: "We use reasonable safeguards to protect your information and do not sell your personal information.",
      },
      {
        title: "Cookies",
        body: "Our website may use cookies to improve your browsing experience. See the Cookie Policy for more detail.",
      },
      {
        title: "Contact",
        body: "The Funni Farm\nthefunnifarm@outlook.com",
      },
    ],
  },
  {
    slug: "shipping",
    title: "Shipping Policy",
    effectiveDate: "January 1, 2026",
    eyebrow: "Policy document",
    isPlaceholder: false,
    description:
      "Shipping policy for The Funni Farm hemp-derived products and merchandise.",
    notice: reviewNotice,
    pdfUrl: "/policies/shipping-policy.pdf",
    sections: [
      {
        title: "Processing Times",
        body: "Orders are typically processed within 1-3 business days, excluding weekends and holidays.",
      },
      {
        title: "Shipping",
        body: "We ship to locations where our hemp-derived products are legally permitted. Shipping times vary by carrier and destination.",
      },
      {
        title: "Order Tracking",
        body: "Tracking information will be emailed once your order ships.",
      },
      {
        title: "Incorrect Addresses",
        body: "Customers are responsible for providing an accurate shipping address. Additional shipping charges due to incorrect addresses are the customer's responsibility.",
      },
      {
        title: "Carrier Delays",
        body: "The Funni Farm is not responsible for delays caused by weather, holidays, carrier issues, or other events outside our control.",
      },
      {
        title: "Contact",
        body: contactBlock,
      },
    ],
  },
  {
    slug: "refunds",
    title: "Refund Policy",
    effectiveDate: "January 1, 2026",
    eyebrow: "Policy document",
    isPlaceholder: false,
    description:
      "Refund, return, cancellation, shipping compliance, age, and support policy for The Funni Farm.",
    notice: reviewNotice,
    pdfUrl: "/policies/the-funni-farm-refund-policy.pdf",
    sections: [
      {
        title: "Our Commitment",
        body: "At The Funni Farm, we take pride in producing high-quality farm products. If there is ever an issue with your order, we are committed to making it right.",
      },
      {
        title: "Returns",
        body: "Due to the consumable nature of hemp-derived products, all edible hemp-derived products are final sale and cannot be returned or exchanged once shipped, except when the product arrives damaged, is defective, or was shipped in error.",
      },
      {
        title: "Merchandise Returns",
        body: "Unused merchandise, including shirts, hats, stickers, and other non-consumable items, may be returned within 30 days of delivery if unused, unwashed, in original condition, and original packaging.\n\nCustomers are responsible for return shipping unless the item was damaged, defective, or shipped incorrectly.",
      },
      {
        title: "Damaged, Defective, or Incorrect Orders",
        body: "Contact us within 7 days of delivery with your order number, a description of the issue, and clear photos of the product and packaging. We may offer a replacement, store credit, or refund at our sole discretion.",
      },
      {
        title: "Lost Packages",
        body: "After shipment, delivery is the responsibility of the shipping carrier. If marked delivered but missing, contact the carrier first. We will assist with claims when possible but cannot guarantee claim outcomes.",
      },
      {
        title: "Order Cancellations",
        body: "Orders may be canceled only before processing or shipment. Once fulfillment begins, orders cannot be canceled.",
      },
      {
        title: "Hemp Product Shipping & Legal Compliance",
        body: "State and local hemp laws vary. By ordering, you acknowledge it is your responsibility to ensure the products are legal where you live. The Funni Farm is not responsible for products refused, confiscated, delayed, returned, or deemed unlawful by authorities.",
      },
      {
        title: "Age Requirement",
        body: "By purchasing hemp-derived products, you certify that you are at least 21 years of age, or the minimum legal age required where you live if higher. We reserve the right to refuse or cancel orders that do not comply with applicable laws or company policies.",
      },
      {
        title: "Adult Signature",
        body: "Certain orders may require an adult signature upon delivery depending on destination, carrier, product, or law. Customers are responsible for ensuring an eligible adult is available to receive the package.",
      },
      {
        title: "Refund Processing",
        body: "Approved refunds will be issued to the original payment method. Please allow 5-10 business days after approval for processing.",
      },
      {
        title: "Contact Us",
        body: contactBlock,
      },
    ],
  },
  {
    slug: "hemp-compliance",
    title: "Hemp Compliance Policy",
    eyebrow: "Policy document",
    description:
      "Hemp compliance policy covering federal hemp compliance, age limits, COAs, shipping, medical claims, and payment-method rules.",
    notice:
      "This page still needs final legal review against the confirmed product mix, shipping states, COAs, and payment workflow before live sales.",
    sections: [
      {
        title: "Applicable Laws",
        body: "Products must comply with applicable federal, state, and local laws. This page must be reviewed before launch.",
      },
      {
        title: "Federal Hemp Compliance",
        body: "Final products should be supported by current COAs confirming applicable federal hemp compliance before sale or shipment.",
      },
      {
        title: "No Medical Claims",
        body: "The Funni Farm should not claim that products diagnose, treat, cure, or prevent disease. Product copy and testimonials should stay focused on general adult wellness routines.",
      },
      {
        title: "Age Restrictions",
        body: "Adult hemp products should include age gate, checkout age confirmation, and any legally required age verification process.",
      },
      {
        title: "Shipping Restrictions",
        body: "The final site should block or warn against shipping products into restricted locations based on product type and current law.",
      },
      {
        title: "Customer Responsibility",
        body: "Customers should confirm that ordering and possessing hemp products is lawful in their location.",
      },
      {
        title: "COA / Lab Testing",
        body: "COA links should match product name, batch number, tested date, cannabinoid profile, and safety testing results.",
      },
      {
        title: "Merchant Processor Compliance",
        body: "Cash App, PayPal, email providers, or any future payment service may require specific product categories, policy language, age checks, prohibited claims, and fulfillment practices.",
      },
    ],
  },
  {
    slug: "age-policy",
    title: "Age Verification Policy",
    effectiveDate: "January 1, 2026",
    eyebrow: "Policy document",
    isPlaceholder: false,
    description:
      "Age verification policy for adult hemp-derived product purchases.",
    notice: reviewNotice,
    pdfUrl: "/policies/age-verification-policy.pdf",
    sections: [
      {
        title: "Minimum Age",
        body: "You must be at least 21 years old, or the minimum legal age in your jurisdiction if higher, to purchase hemp-derived products.",
      },
      {
        title: "Verification",
        body: "We reserve the right to request age verification before shipping any order.",
      },
      {
        title: "Refusal",
        body: "Orders that cannot be verified or do not comply with applicable laws may be canceled and refunded at our discretion.",
      },
      {
        title: "Adult Signature",
        body: "Certain shipments may require an adult signature upon delivery.",
      },
    ],
  },
  {
    slug: "disclaimer",
    title: "FDA Disclaimer",
    eyebrow: "Policy document",
    isPlaceholder: false,
    description:
      "FDA and product-use disclaimer for The Funni Farm hemp-derived products.",
    notice: reviewNotice,
    pdfUrl: "/policies/fda-disclaimer.pdf",
    sections: [
      {
        title: "Important Notice",
        body: "Statements made about our products have not been evaluated by the U.S. Food and Drug Administration (FDA).",
      },
      {
        title: "Medical Disclaimer",
        body: "Products are not intended to diagnose, treat, cure, or prevent any disease.",
      },
      {
        title: "Healthcare",
        body: "Consult your healthcare provider before using hemp-derived products, especially if pregnant, nursing, taking medications, or under medical supervision.",
      },
      {
        title: "Responsibility",
        body: "Use products only as directed and keep out of reach of children and pets.",
      },
    ],
  },
  {
    slug: "website-disclaimer",
    title: "Website Disclaimer",
    effectiveDate: "January 1, 2026",
    eyebrow: "Policy document",
    isPlaceholder: false,
    description:
      "Website disclaimer covering informational content, product accuracy, external links, and responsibility.",
    notice: reviewNotice,
    pdfUrl: "/policies/website-disclaimer.pdf",
    sections: [
      {
        title: "General Information",
        body: "The information provided on this website is for general informational and educational purposes only and should not be considered medical, legal, or professional advice.",
      },
      {
        title: "No Medical Advice",
        body: "Nothing on this website is intended to diagnose, treat, cure, or prevent any disease. Always seek advice from a qualified healthcare professional regarding medical concerns.",
      },
      {
        title: "Product Information",
        body: "We strive to keep product descriptions, pricing, ingredients, availability, and images accurate; however, errors may occasionally occur. We reserve the right to correct inaccuracies without prior notice.",
      },
      {
        title: "Individual Results",
        body: "Individual experiences with hemp-derived products may vary. No guarantee is made regarding specific outcomes or benefits.",
      },
      {
        title: "External Links",
        body: "Our website may contain links to third-party websites for your convenience. We are not responsible for the content, privacy practices, or policies of those websites.",
      },
      {
        title: "Limitation of Responsibility",
        body: "Use of this website and our products is at your own risk to the fullest extent permitted by applicable law.",
      },
      {
        title: "Contact",
        body: contactBlock,
      },
    ],
  },
  {
    slug: "warnings-safe-use",
    title: "Product Warnings & Safe Use",
    effectiveDate: "January 1, 2026",
    eyebrow: "Customer guide",
    isPlaceholder: false,
    description:
      "Safe-use guidance for adult hemp-derived products, including serving, storage, allergens, and adverse reaction reminders.",
    notice: reviewNotice,
    pdfUrl: "/policies/product-warnings-and-safe-use.pdf",
    sections: [
      {
        title: "Read Before Use",
        body: "Read all product labeling and follow all directions before consuming any product.",
      },
      {
        title: "Adult Use Only",
        body: "Products are intended only for adults who meet the minimum legal purchasing age in their jurisdiction.",
      },
      {
        title: "Keep Away From Children and Pets",
        body: "Store products in a secure location that is inaccessible to children and pets.",
      },
      {
        title: "Do Not Exceed Serving Size",
        body: "Begin with the labeled serving size and allow adequate time before considering additional consumption.",
      },
      {
        title: "Driving and Machinery",
        body: "Do not drive, operate machinery, or perform safety-sensitive activities if you experience drowsiness, impairment, or any unexpected effects after use.",
      },
      {
        title: "Medical Advice",
        body: "Consult a qualified healthcare professional before use if you are pregnant, nursing, have a medical condition, or take prescription or over-the-counter medications.",
      },
      {
        title: "Allergens",
        body: "Review the ingredient list before use. Do not consume products containing ingredients to which you are allergic or sensitive.",
      },
      {
        title: "Storage",
        body: "Store products in a cool, dry place away from direct sunlight, excessive heat, humidity, and moisture. Reseal packaging after opening when applicable.",
      },
      {
        title: "Adverse Reactions",
        body: "Discontinue use and seek medical attention if you experience an unexpected or adverse reaction.",
      },
      {
        title: "Use Responsibly",
        body: "Use products only as intended. Do not alter, repackage, or misuse products.",
      },
      {
        title: "Questions",
        body: "Contact us if you have questions regarding product ingredients, usage, storage, or laboratory testing.",
      },
      {
        title: "Contact",
        body: contactBlock,
      },
    ],
  },
  {
    slug: "responsible-use",
    title: "Responsible Use Guide",
    effectiveDate: "January 1, 2026",
    eyebrow: "Customer guide",
    isPlaceholder: false,
    description:
      "Responsible-use guide for hemp-derived products, serving awareness, storage, travel, and product questions.",
    notice: reviewNotice,
    pdfUrl: "/policies/responsible-use-guide.pdf",
    sections: [
      {
        title: "Our Philosophy",
        body: "The Funni Farm encourages customers to use hemp-derived products responsibly and according to all product labeling.",
      },
      {
        title: "Start Low",
        body: "If you are new to hemp-derived products, begin with the labeled serving size and allow sufficient time before considering additional use.",
      },
      {
        title: "Know Your Limits",
        body: "Individual responses vary based on body chemistry, experience, and other factors. Always use products responsibly.",
      },
      {
        title: "Mixing With Other Substances",
        body: "Consult a qualified healthcare professional before combining hemp-derived products with alcohol, medications, or dietary supplements.",
      },
      {
        title: "Storage",
        body: "Store products in their original packaging in a cool, dry location away from direct sunlight. Keep products secured from children and pets.",
      },
      {
        title: "Travel",
        body: "Before traveling, verify that hemp-derived products are legal at your destination. Laws vary by state and locality.",
      },
      {
        title: "Questions",
        body: "If you have questions about product ingredients, serving information, or Certificates of Analysis (COAs), contact The Funni Farm before use.",
      },
      {
        title: "Contact",
        body: contactBlock,
      },
    ],
  },
  {
    slug: "consumer-safety",
    title: "Consumer Safety Guide",
    effectiveDate: "January 1, 2026",
    eyebrow: "Customer guide",
    isPlaceholder: false,
    description:
      "Consumer safety guide for inspection, serving, storage, expiration, medication conversations, and product concerns.",
    notice: reviewNotice,
    pdfUrl: "/policies/consumer-safety-guide.pdf",
    sections: [
      {
        title: "Product Inspection",
        body: "Inspect the package before opening. Do not consume products if the safety seal is broken, the package is damaged, or the product appears contaminated.",
      },
      {
        title: "Serving Recommendations",
        body: "Always follow the serving size printed on the product label. Wait an appropriate amount of time before considering an additional serving.",
      },
      {
        title: "Storage",
        body: "Keep products in their original packaging. Store in a cool, dry location away from direct sunlight, excessive heat, humidity, children, and pets.",
      },
      {
        title: "Expiration",
        body: "Do not consume products after the printed Best By date. If the product develops an unusual odor, color, texture, or taste, discontinue use.",
      },
      {
        title: "Medication Interactions",
        body: "If you take prescription medications or have a medical condition, consult your healthcare provider before using hemp-derived products.",
      },
      {
        title: "Emergency Information",
        body: "If a child or pet accidentally consumes a product, contact your local poison center or seek immediate medical or veterinary assistance.",
      },
      {
        title: "Reporting Product Concerns",
        body: "If you believe you received a defective product, contact The Funni Farm with your order number, batch number, and photographs so we can investigate.",
      },
      {
        title: "Contact",
        body: contactBlock,
      },
    ],
  },
  {
    slug: "storage-shelf-life",
    title: "Product Storage & Shelf Life Guide",
    effectiveDate: "January 1, 2026",
    eyebrow: "Customer guide",
    isPlaceholder: false,
    description:
      "Storage and shelf-life guidance for hemp-derived products, including temperature, best-by dates, and signs to discard.",
    notice: reviewNotice,
    pdfUrl: "/policies/storage-and-shelf-life-guide.pdf",
    sections: [
      {
        title: "Proper Storage",
        body: "Store products in their original sealed packaging in a cool, dry place away from direct sunlight, excessive heat, moisture, and humidity.",
      },
      {
        title: "Temperature",
        body: "Avoid prolonged exposure to temperatures above normal room temperature. Do not leave products in vehicles or other hot environments.",
      },
      {
        title: "Best By Date",
        body: "For the best quality, consume products on or before the printed Best By date.",
      },
      {
        title: "After Opening",
        body: "Reseal packaging promptly after opening to help preserve freshness and product quality.",
      },
      {
        title: "Signs to Discard",
        body: "Do not consume any product that shows signs of mold, unusual odor, discoloration, damaged packaging, or other evidence of contamination.",
      },
      {
        title: "Travel and Transport",
        body: "Transport products in a manner that protects them from excessive heat, crushing, moisture, and direct sunlight.",
      },
      {
        title: "Questions",
        body: "If you have questions regarding storage, shelf life, or product quality, please contact The Funni Farm before use.",
      },
      {
        title: "Contact",
        body: contactBlock,
      },
    ],
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    effectiveDate: "January 1, 2026",
    eyebrow: "Policy document",
    isPlaceholder: false,
    description:
      "Cookie policy covering cart cookies, preferences, analytics, security cookies, and third-party services.",
    notice: reviewNotice,
    pdfUrl: "/policies/cookie-policy.pdf",
    sections: [
      {
        title: "What Are Cookies?",
        body: "Cookies are small text files placed on your device when you visit a website. They help websites function properly, remember preferences, and improve the user experience.",
      },
      {
        title: "How We Use Cookies",
        body: "The Funni Farm may use cookies to remember shopping cart contents, maintain login sessions, save website preferences, improve website performance, and understand how visitors use our website.",
      },
      {
        title: "Types of Cookies",
        body: "We may use essential cookies, functionality cookies, analytics cookies, and security-related cookies. Some cookies may be placed by trusted third-party service providers that support our website.",
      },
      {
        title: "Managing Cookies",
        body: "Most web browsers allow you to block, remove, or manage cookies through browser settings. Disabling cookies may affect the functionality of certain features of our website.",
      },
      {
        title: "Third-Party Services",
        body: "Third-party providers such as payment processors, analytics platforms, or embedded services may use their own cookies in accordance with their respective privacy policies.",
      },
      {
        title: "Policy Updates",
        body: "This Cookie Policy may be updated periodically. Changes become effective when the revised version is posted with a new effective date.",
      },
      {
        title: "Contact",
        body: contactBlock,
      },
    ],
  },
  {
    slug: "accessibility",
    title: "Accessibility Statement",
    effectiveDate: "January 1, 2026",
    eyebrow: "Website statement",
    isPlaceholder: false,
    description:
      "Accessibility statement for The Funni Farm website and customer assistance.",
    notice: reviewNotice,
    pdfUrl: "/policies/accessibility-statement.pdf",
    sections: [
      {
        title: "Our Commitment",
        body: "The Funni Farm is committed to providing a website that is accessible and usable for as many people as possible, including individuals with disabilities.",
      },
      {
        title: "Accessibility Goals",
        body: "We strive to improve the accessibility, usability, and overall customer experience of our website through ongoing evaluation and updates.",
      },
      {
        title: "Website Features",
        body: "We make reasonable efforts to support clear navigation, readable content, descriptive headings, and compatibility with commonly used browsers and assistive technologies where practical.",
      },
      {
        title: "Continuous Improvement",
        body: "Accessibility is an ongoing effort. We periodically review our website and make improvements as technology, standards, and our website evolve.",
      },
      {
        title: "Need Assistance?",
        body: "If you experience difficulty accessing any part of our website or need assistance placing an order, obtaining product information, or requesting a Certificate of Analysis (COA), please contact us and we will make reasonable efforts to assist you.",
      },
      {
        title: "Feedback",
        body: "We welcome feedback regarding the accessibility of our website. Your comments help us identify areas for improvement.",
      },
      {
        title: "Contact",
        body: contactBlock,
      },
    ],
  },
  {
    slug: "wholesale",
    title: "Wholesale Policy",
    effectiveDate: "January 1, 2026",
    eyebrow: "Business policy",
    isPlaceholder: false,
    description:
      "Wholesale account policy for approved business customers, pricing, shipping, returns, and resale compliance.",
    notice: reviewNotice,
    pdfUrl: "/policies/wholesale-policy.pdf",
    sections: [
      {
        title: "Wholesale Accounts",
        body: "Wholesale pricing is available only to approved business customers and may require proof of a valid business or resale certificate where applicable.",
      },
      {
        title: "Minimum Orders",
        body: "Minimum opening and reorder quantities may apply and will be communicated before an order is accepted.",
      },
      {
        title: "Pricing",
        body: "Wholesale prices are confidential, subject to change without notice, and supersede any previous pricing.",
      },
      {
        title: "Payment Terms",
        body: "Unless otherwise agreed in writing, payment is due before shipment.",
      },
      {
        title: "Shipping",
        body: "Wholesale orders are shipped according to our Shipping Policy. Freight charges, if applicable, are the responsibility of the purchaser unless otherwise agreed.",
      },
      {
        title: "Returns",
        body: "Wholesale returns are accepted only for products that arrive damaged, defective, or shipped in error unless otherwise agreed in writing.",
      },
      {
        title: "Resale Compliance",
        body: "Wholesale customers are responsible for complying with all applicable federal, state, and local laws governing the resale of hemp-derived products.",
      },
      {
        title: "Contact",
        body: contactBlock,
      },
    ],
  },
  {
    slug: "affiliate-influencer",
    title: "Affiliate & Influencer Policy",
    effectiveDate: "January 1, 2026",
    eyebrow: "Business policy",
    isPlaceholder: false,
    description:
      "Affiliate and influencer policy covering approval, truthful advertising, FDA compliance, disclosures, and brand use.",
    notice: reviewNotice,
    pdfUrl: "/policies/affiliate-and-influencer-policy.pdf",
    sections: [
      {
        title: "Program Eligibility",
        body: "Affiliate and influencer partnerships are subject to approval by The Funni Farm.",
      },
      {
        title: "Truthful Advertising",
        body: "Partners must accurately represent our products and may not make false, misleading, or unsubstantiated health or medical claims.",
      },
      {
        title: "FDA Compliance",
        body: "Affiliates may not state or imply that our products diagnose, treat, cure, or prevent any disease.",
      },
      {
        title: "Required Disclosures",
        body: "Affiliates are responsible for complying with applicable advertising laws, including clearly disclosing paid partnerships or commissions where required.",
      },
      {
        title: "Use of Branding",
        body: "The Funni Farm name, logos, photographs, and marketing materials may only be used as authorized.",
      },
      {
        title: "Prohibited Content",
        body: "Affiliates may not promote products through unlawful, deceptive, offensive, or age-inappropriate content.",
      },
      {
        title: "Termination",
        body: "The Funni Farm may suspend or terminate affiliate relationships at any time for violations of this policy or applicable law.",
      },
      {
        title: "Contact",
        body: contactBlock,
      },
    ],
  },
  {
    slug: "recall-incident-response",
    title: "Recall & Incident Response Policy",
    effectiveDate: "January 1, 2026",
    eyebrow: "Safety policy",
    isPlaceholder: false,
    description:
      "Product quality and safety concern policy covering reporting, investigation, corrective actions, and customer notifications.",
    notice: reviewNotice,
    pdfUrl: "/policies/recall-and-incident-response-policy.pdf",
    sections: [
      {
        title: "Purpose",
        body: "The Funni Farm is committed to responding promptly to any product quality or safety concern affecting our customers.",
      },
      {
        title: "Reporting a Concern",
        body: "Customers should contact us immediately if they believe a product may be defective, contaminated, mislabeled, or otherwise unsafe. Please include your order number, batch or lot number, photographs, and a description of the concern.",
      },
      {
        title: "Product Investigation",
        body: "Each reported concern will be reviewed and documented. We may request additional information or ask that the product be returned for evaluation.",
      },
      {
        title: "Corrective Actions",
        body: "Depending on the findings, corrective actions may include customer notifications, product replacement, refunds, voluntary recalls, manufacturing changes, or other appropriate measures.",
      },
      {
        title: "Batch Identification",
        body: "Batch and lot numbers help us identify affected products quickly. Customers are encouraged to retain original packaging until the product has been consumed.",
      },
      {
        title: "Regulatory Cooperation",
        body: "When required, The Funni Farm will cooperate with applicable regulatory authorities regarding product investigations or recalls.",
      },
      {
        title: "Customer Notification",
        body: "If a recall or safety notice affects products you purchased and contact information is available, we will make reasonable efforts to notify affected customers.",
      },
      {
        title: "Contact",
        body: contactBlock,
      },
    ],
  },
  {
    slug: "quality-guarantee",
    title: "Quality Guarantee",
    effectiveDate: "January 1, 2026",
    eyebrow: "Customer promise",
    isPlaceholder: false,
    description:
      "Quality guarantee covering ingredients, batch consistency, third-party testing, customer concerns, and continuous improvement.",
    notice: reviewNotice,
    pdfUrl: "/policies/quality-guarantee.pdf",
    sections: [
      {
        title: "Our Promise",
        body: "At The Funni Farm, we are committed to producing quality hemp-derived products using carefully selected ingredients and consistent manufacturing practices.",
      },
      {
        title: "Ingredient Standards",
        body: "We strive to source quality ingredients and packaging materials from reputable suppliers whenever reasonably available.",
      },
      {
        title: "Batch Consistency",
        body: "Each production batch is prepared using standardized procedures to help provide consistent quality from batch to batch.",
      },
      {
        title: "Third-Party Testing",
        body: "Where applicable, products are independently tested, and Certificates of Analysis (COAs) are made available when possible.",
      },
      {
        title: "Customer Satisfaction",
        body: "If you believe your product has a quality issue, contact us promptly with your order number, batch number, and photographs so we can investigate.",
      },
      {
        title: "Continuous Improvement",
        body: "Customer feedback, product testing, and quality reviews help us continually improve our products and processes.",
      },
      {
        title: "Contact",
        body: contactBlock,
      },
    ],
  },
  ...contentThreePolicies,
];

export function getPolicy(slug: string) {
  return policies.find((policy) => policy.slug === slug);
}
