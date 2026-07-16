import type { Policy } from "./content";

const reviewNotice =
  "This page is based on The Funni Farm's supplied PDF. Have it reviewed with final legal, label, and compliance guidance before live sales.";

const contactBlock =
  "The Funni Farm\nEmail: thefunnifarm@outlook.com\nPhone: (931) 551-0899\nWebsite: www.thefunnifarm.com";

export const contentThreePolicies: Policy[] = [
  {
    slug: "website-changes-updates",
    title: "Website Changes & Updates Policy",
    effectiveDate: "January 1, 2026",
    eyebrow: "Website policy",
    isPlaceholder: false,
    description:
      "How The Funni Farm may update website content, products, policies, pricing, and services.",
    notice: reviewNotice,
    pdfUrl: "/policies/website-changes-and-updates-policy.pdf",
    sections: [
      {
        title: "Policy Updates",
        body: "The Funni Farm may update its website, products, policies, pricing, and services from time to time to reflect operational, legal, or regulatory changes.",
      },
      {
        title: "Effective Date",
        body: "When a policy is updated, the Effective Date at the top of the document will be revised to indicate the most recent version.",
      },
      {
        title: "Website Content",
        body: "Product descriptions, photographs, pricing, availability, educational content, and other website information may change without prior notice.",
      },
      {
        title: "Customer Responsibility",
        body: "Customers are encouraged to review our policies periodically to remain informed of any changes that may affect future purchases or use of our website.",
      },
      {
        title: "Questions",
        body: "If you have questions regarding a policy update or website change, please contact us.",
      },
      { title: "Contact", body: contactBlock },
    ],
  },
  {
    slug: "product-claims-labeling",
    title: "Product Claims & Labeling Policy",
    effectiveDate: "January 1, 2026",
    eyebrow: "Compliance policy",
    isPlaceholder: false,
    description:
      "Label accuracy, truthful marketing, no disease claims, label updates, and customer questions.",
    notice: reviewNotice,
    pdfUrl: "/policies/product-claims-and-labeling-policy.pdf",
    sections: [
      {
        title: "Label Accuracy",
        body: "The Funni Farm strives to ensure product labels accurately identify ingredients, serving information, batch identification, and other required information at the time of manufacture.",
      },
      {
        title: "Marketing Claims",
        body: "We make reasonable efforts to ensure product descriptions and marketing materials are truthful and comply with applicable laws and regulations.",
      },
      {
        title: "No Disease Claims",
        body: "Our products are not marketed as diagnosing, treating, curing, or preventing any disease. Customers should not rely on product information as medical advice.",
      },
      {
        title: "Label Updates",
        body: "Labels may change from time to time to reflect product improvements, regulatory updates, or packaging revisions without prior notice.",
      },
      {
        title: "Customer Questions",
        body: "If you have questions about ingredients, labeling, allergens, or product information, please contact us before using the product.",
      },
      { title: "Contact", body: contactBlock },
    ],
  },
  {
    slug: "website-acceptable-use",
    title: "Website Acceptable Use Policy",
    effectiveDate: "January 1, 2026",
    eyebrow: "Website policy",
    isPlaceholder: false,
    description:
      "Acceptable use rules for lawful shopping, product information, communications, and site security.",
    notice: reviewNotice,
    pdfUrl: "/policies/website-acceptable-use-policy.pdf",
    sections: [
      {
        title: "Purpose",
        body: "This policy explains the acceptable use of The Funni Farm website and online services.",
      },
      {
        title: "Permitted Use",
        body: "You may use this website for lawful shopping, obtaining information about our products, and communicating with our business.",
      },
      {
        title: "Prohibited Conduct",
        body: "You may not use the website to commit fraud, upload malicious software, interfere with website operations, harvest customer information, impersonate another person, or violate applicable laws.",
      },
      {
        title: "User Content",
        body: "Any content you submit must be truthful, lawful, and respectful. You are responsible for the content you provide.",
      },
      {
        title: "Service Availability",
        body: "We may modify, suspend, or discontinue website features at any time for maintenance, security, or operational reasons.",
      },
      {
        title: "Policy Enforcement",
        body: "We reserve the right to restrict access, remove content, suspend accounts, or take other appropriate action when this policy is violated.",
      },
      { title: "Contact", body: contactBlock },
    ],
  },
  {
    slug: "responsible-marketing",
    title: "Responsible Marketing Policy",
    effectiveDate: "January 1, 2026",
    eyebrow: "Compliance policy",
    isPlaceholder: false,
    description:
      "Responsible marketing standards for truthful information, adult audiences, social media, and corrections.",
    notice: reviewNotice,
    pdfUrl: "/policies/responsible-marketing-policy.pdf",
    sections: [
      {
        title: "Marketing Standards",
        body: "The Funni Farm is committed to honest, transparent, and responsible marketing practices for all products and services.",
      },
      {
        title: "Truthful Information",
        body: "We strive to ensure product descriptions, photographs, pricing, ingredients, and advertising materials are accurate at the time they are published.",
      },
      {
        title: "No Disease Claims",
        body: "We do not intentionally market our hemp-derived products as diagnosing, treating, curing, or preventing any disease.",
      },
      {
        title: "Age-Appropriate Marketing",
        body: "Our marketing is intended for adults who are legally permitted to purchase hemp-derived products and is not directed toward children.",
      },
      {
        title: "Social Media",
        body: "Content shared on social media is intended for informational purposes and should not be interpreted as medical advice.",
      },
      {
        title: "Corrections",
        body: "If inaccurate marketing information is identified, we will make reasonable efforts to correct it promptly.",
      },
      { title: "Contact", body: contactBlock },
    ],
  },
  {
    slug: "governing-law-dispute-resolution",
    title: "Governing Law & Dispute Resolution Policy",
    effectiveDate: "January 1, 2026",
    eyebrow: "Policy document",
    isPlaceholder: false,
    description:
      "Tennessee governing law, good faith dispute resolution, jurisdiction, severability, and updates.",
    notice: reviewNotice,
    pdfUrl: "/policies/governing-law-and-dispute-resolution-policy.pdf",
    sections: [
      {
        title: "Governing Law",
        body: "These policies and transactions are governed by the laws of the State of Tennessee, without regard to conflict-of-law principles, except where applicable law requires otherwise.",
      },
      {
        title: "Good Faith Resolution",
        body: "If a dispute arises, we encourage customers to contact us first so we can attempt to resolve the matter in good faith before formal legal action is pursued.",
      },
      {
        title: "Jurisdiction",
        body: "Unless otherwise required by law, legal proceedings relating to purchases or website use should be brought in a court of competent jurisdiction located in Tennessee.",
      },
      {
        title: "Severability",
        body: "If any provision of this policy is determined to be invalid or unenforceable, the remaining provisions will continue in full force and effect.",
      },
      {
        title: "Policy Updates",
        body: "We may update this policy from time to time. Changes become effective when posted with a revised effective date.",
      },
      { title: "Contact", body: contactBlock },
    ],
  },
  {
    slug: "product-availability-backorder",
    title: "Product Availability & Backorder Policy",
    effectiveDate: "January 1, 2026",
    eyebrow: "Shopping policy",
    isPlaceholder: false,
    description:
      "Inventory, out-of-stock items, backorders, partial shipments, and delayed product cancellation rules.",
    notice: reviewNotice,
    pdfUrl: "/policies/product-availability-and-backorder-policy.pdf",
    sections: [
      {
        title: "Inventory",
        body: "We work to maintain accurate inventory levels, but product availability is not guaranteed until your order has been accepted and processed.",
      },
      {
        title: "Out of Stock",
        body: "If a product becomes unavailable after your order is placed, we may contact you with available options, including waiting for restock, selecting a substitute with your approval, or receiving a refund.",
      },
      {
        title: "Backorders",
        body: "When offered, backordered items will ship as soon as inventory becomes available. Estimated availability dates are approximate and subject to change.",
      },
      {
        title: "Partial Shipments",
        body: "Orders containing multiple items may be shipped in separate shipments when appropriate.",
      },
      {
        title: "Order Cancellation",
        body: "If a delayed or unavailable product cannot be fulfilled within a reasonable period, we may cancel the affected portion of the order and issue an appropriate refund.",
      },
      { title: "Contact", body: contactBlock },
    ],
  },
  {
    slug: "contact-support",
    title: "Contact & Support Policy",
    effectiveDate: "January 1, 2026",
    eyebrow: "Customer support",
    isPlaceholder: false,
    description:
      "Customer support expectations, contact methods, response times, order assistance, and product questions.",
    notice: reviewNotice,
    pdfUrl: "/policies/contact-and-support-policy.pdf",
    sections: [
      {
        title: "Customer Support",
        body: "We are committed to providing courteous, timely, and professional customer support regarding orders, products, and general inquiries.",
      },
      {
        title: "Contact Methods",
        body: "Customers may contact us by email, telephone, or through our website contact form.",
      },
      {
        title: "Response Times",
        body: "We make reasonable efforts to respond to inquiries within 1-2 business days. Response times may be longer during holidays or periods of high demand.",
      },
      {
        title: "Order Assistance",
        body: "Please include your order number when contacting us about an existing order so we can assist you more efficiently.",
      },
      {
        title: "Product Questions",
        body: "We are happy to answer questions regarding ingredients, product use, batch information, and Certificates of Analysis (COAs), but we cannot provide medical advice.",
      },
      {
        title: "Respectful Communication",
        body: "We ask that all communications remain respectful. Abusive, threatening, or harassing communications may result in termination of further communication where permitted by law.",
      },
      { title: "Contact Information", body: contactBlock },
    ],
  },
  {
    slug: "business-ethics",
    title: "Business Ethics Statement",
    effectiveDate: "January 1, 2026",
    eyebrow: "Customer trust",
    isPlaceholder: false,
    description:
      "The Funni Farm values for integrity, quality, customer service, truthful marketing, fair practices, and improvement.",
    notice: reviewNotice,
    pdfUrl: "/policies/business-ethics-statement.pdf",
    sections: [
      {
        title: "Our Values",
        body: "We are committed to conducting business with honesty, integrity, accountability, and respect for our customers, employees, suppliers, and community.",
      },
      {
        title: "Quality & Compliance",
        body: "We strive to manufacture and sell products that comply with applicable laws and maintain quality standards through responsible business practices.",
      },
      {
        title: "Customer Service",
        body: "We believe in treating every customer fairly, responding professionally to concerns, and working in good faith to resolve legitimate issues.",
      },
      {
        title: "Truthful Marketing",
        body: "We aim to provide accurate product information and avoid misleading or unsubstantiated claims about our products.",
      },
      {
        title: "Fair Business Practices",
        body: "We expect ethical conduct in all business relationships and do not knowingly participate in fraudulent, deceptive, or unlawful activities.",
      },
      {
        title: "Continuous Improvement",
        body: "We regularly evaluate our practices and welcome constructive feedback that helps us improve our products, services, and customer experience.",
      },
      { title: "Contact", body: contactBlock },
    ],
  },
  {
    slug: "pricing",
    title: "Price Match & Pricing Policy",
    effectiveDate: "January 1, 2026",
    eyebrow: "Shopping policy",
    isPlaceholder: false,
    description:
      "Pricing, price matching, promotional pricing, pricing errors, and sales tax notes.",
    notice: reviewNotice,
    pdfUrl: "/policies/price-match-and-pricing-policy.pdf",
    sections: [
      {
        title: "Pricing",
        body: "We strive to offer fair and competitive pricing. Prices are subject to change without prior notice.",
      },
      {
        title: "Price Matching",
        body: "Unless specifically advertised, The Funni Farm does not offer price matching with competitors.",
      },
      {
        title: "Promotional Pricing",
        body: "Sale prices, coupons, and promotional offers are valid only during the advertised promotional period and cannot be applied retroactively unless required by law.",
      },
      {
        title: "Pricing Errors",
        body: "If a product is listed at an incorrect price due to a typographical, technical, or system error, we reserve the right to cancel the order and issue a refund before shipment.",
      },
      {
        title: "Taxes",
        body: "Applicable sales taxes are calculated during checkout based on the shipping destination and applicable law.",
      },
      { title: "Contact", body: contactBlock },
    ],
  },
  {
    slug: "testimonials-reviews",
    title: "Testimonials & Reviews Policy",
    effectiveDate: "January 1, 2026",
    eyebrow: "Compliance policy",
    isPlaceholder: false,
    description:
      "Rules for honest reviews, content standards, moderation, no medical claims, and review use.",
    notice: reviewNotice,
    pdfUrl: "/policies/testimonials-and-reviews-policy.pdf",
    sections: [
      {
        title: "Honest Reviews",
        body: "We welcome honest reviews from customers based on their own experience with our products and service.",
      },
      {
        title: "Content Standards",
        body: "Reviews must not contain false information, unlawful content, offensive language, personal attacks, spam, or another person's private information.",
      },
      {
        title: "Moderation",
        body: "We reserve the right to remove reviews that violate this policy, are clearly fraudulent, or are unrelated to the product or service being reviewed.",
      },
      {
        title: "No Medical Claims",
        body: "Testimonials reflect individual customer experiences and do not represent guarantees of results. Reviews may not be used to make claims that our products diagnose, treat, cure, or prevent any disease.",
      },
      {
        title: "Use of Reviews",
        body: "By submitting a review, you grant The Funni Farm permission to display it on our website and marketing materials, unless prohibited by law.",
      },
      { title: "Contact", body: contactBlock },
    ],
  },
  {
    slug: "sustainability",
    title: "Environmental & Sustainability Statement",
    effectiveDate: "January 1, 2026",
    eyebrow: "Customer trust",
    isPlaceholder: false,
    description:
      "The Funni Farm's practical approach to responsible sourcing, waste reduction, packaging, and ongoing improvement.",
    notice: reviewNotice,
    pdfUrl: "/policies/environmental-and-sustainability-statement.pdf",
    sections: [
      {
        title: "Our Commitment",
        body: "The Funni Farm strives to operate responsibly by making practical decisions that support long-term environmental stewardship while producing quality hemp-derived products.",
      },
      {
        title: "Responsible Sourcing",
        body: "Whenever practical, we seek to work with reputable suppliers who value quality, compliance, and responsible business practices.",
      },
      {
        title: "Waste Reduction",
        body: "We continually evaluate opportunities to reduce waste, improve production efficiency, and responsibly manage materials used in our operations.",
      },
      {
        title: "Packaging",
        body: "We evaluate packaging options that balance product protection, food safety, regulatory compliance, and environmental considerations.",
      },
      {
        title: "Continuous Improvement",
        body: "Sustainability is an ongoing effort. As our business grows, we will continue evaluating opportunities to improve our environmental practices.",
      },
      {
        title: "Customer Participation",
        body: "Customers can help by properly recycling eligible packaging materials where local recycling programs are available and by disposing of products responsibly.",
      },
      { title: "Contact", body: contactBlock },
    ],
  },
  {
    slug: "subscriptions",
    title: "Subscription Policy",
    effectiveDate: "January 1, 2026",
    eyebrow: "Future feature",
    isPlaceholder: false,
    description:
      "Optional subscription terms for enrollment, billing, management, price changes, availability, and cancellation.",
    notice:
      "This policy is included for future subscription support. Subscriptions are not active unless The Funni Farm enables that feature and completes payment, account, and legal review.",
    pdfUrl: "/policies/subscription-policy.pdf",
    sections: [
      {
        title: "Enrollment",
        body: "Customers who enroll in an optional subscription authorize recurring shipments and recurring charges according to the plan selected at checkout.",
      },
      {
        title: "Billing",
        body: "Subscription payments are charged automatically using the payment method on file before each scheduled shipment.",
      },
      {
        title: "Managing Your Subscription",
        body: "Customers may update payment information, shipping addresses, pause, or cancel subscriptions through their account or by contacting us before the next billing date.",
      },
      {
        title: "Price Changes",
        body: "If subscription pricing changes, the updated price will apply to future renewals after notice is provided where required by law.",
      },
      {
        title: "Availability",
        body: "Subscription products remain subject to availability. If an item is unavailable, we may delay, substitute with your consent, or cancel the shipment.",
      },
      {
        title: "Cancellation",
        body: "Subscriptions may be canceled before the next billing cycle. Charges already processed for an upcoming shipment may not be reversible once fulfillment has begun.",
      },
      { title: "Contact", body: contactBlock },
    ],
  },
  {
    slug: "gift-cards",
    title: "Gift Card Policy",
    effectiveDate: "January 1, 2026",
    eyebrow: "Future feature",
    isPlaceholder: false,
    description:
      "Gift card purchase, redemption, refund, lost card, promotional card, and fraud rules.",
    notice:
      "This policy is included for future gift card support. Gift cards are not active unless The Funni Farm enables that feature and completes legal/payment review.",
    pdfUrl: "/policies/gift-card-policy.pdf",
    sections: [
      {
        title: "Purchasing Gift Cards",
        body: "Gift cards may be purchased in available denominations through The Funni Farm website or other authorized sales channels.",
      },
      {
        title: "Redemption",
        body: "Gift cards may be redeemed toward eligible purchases on The Funni Farm website until the available balance is exhausted.",
      },
      {
        title: "Non-Refundable",
        body: "Gift card purchases are generally non-refundable and may not be redeemed for cash except where required by applicable law.",
      },
      {
        title: "Lost or Stolen Cards",
        body: "Treat gift cards like cash. We are not responsible for lost, stolen, altered, or unauthorized use of gift cards unless required by law.",
      },
      {
        title: "Promotional Gift Cards",
        body: "Promotional or complimentary gift cards may have additional restrictions or expiration terms if permitted by applicable law and stated at the time of issuance.",
      },
      {
        title: "Fraud",
        body: "We reserve the right to refuse, cancel, or suspend gift cards obtained through fraud, unauthorized activity, or misuse.",
      },
      { title: "Contact", body: contactBlock },
    ],
  },
  {
    slug: "vendor-code-of-conduct",
    title: "Vendor Code of Conduct",
    effectiveDate: "January 1, 2026",
    eyebrow: "Business policy",
    isPlaceholder: false,
    description:
      "Standards for suppliers, vendors, contractors, and business partners working with The Funni Farm.",
    notice: reviewNotice,
    pdfUrl: "/policies/vendor-code-of-conduct.pdf",
    sections: [
      {
        title: "Purpose",
        body: "This Code of Conduct outlines the standards The Funni Farm expects from suppliers, vendors, contractors, and business partners.",
      },
      {
        title: "Legal Compliance",
        body: "Vendors are expected to comply with all applicable federal, state, and local laws and regulations relevant to the products or services they provide.",
      },
      {
        title: "Product Quality",
        body: "Suppliers should provide products and materials that meet agreed-upon specifications and applicable quality standards.",
      },
      {
        title: "Business Integrity",
        body: "We expect honest business practices and prohibit fraud, bribery, falsified records, or deceptive conduct in business relationships.",
      },
      {
        title: "Confidentiality",
        body: "Vendors should protect confidential business information and customer information entrusted to them.",
      },
      {
        title: "Continuous Improvement",
        body: "The Funni Farm values long-term business relationships built on quality, reliability, communication, and continual improvement.",
      },
      { title: "Contact", body: contactBlock },
    ],
  },
  {
    slug: "product-quality-complaints",
    title: "Product Quality Complaint Policy",
    effectiveDate: "January 1, 2026",
    eyebrow: "Safety policy",
    isPlaceholder: false,
    description:
      "How customers can report product quality concerns for documentation, review, and fair resolution.",
    notice: reviewNotice,
    pdfUrl: "/policies/product-quality-complaint-policy.pdf",
    sections: [
      {
        title: "Purpose",
        body: "The Funni Farm encourages customers to report product quality concerns so they can be reviewed promptly and fairly.",
      },
      {
        title: "How to Report a Concern",
        body: "Please provide your order number, batch or lot number if available, a description of the concern, and photographs of the product and packaging whenever possible.",
      },
      {
        title: "Review Process",
        body: "Each complaint is documented and evaluated. We may request additional information or the return of the product for further inspection.",
      },
      {
        title: "Possible Resolutions",
        body: "Depending on our findings, we may offer a replacement product, store credit, refund, or another appropriate resolution consistent with our published policies.",
      },
      {
        title: "Continuous Improvement",
        body: "Complaint information is reviewed to help identify opportunities to improve our products, packaging, manufacturing processes, and customer experience.",
      },
      { title: "Contact", body: contactBlock },
    ],
  },
  {
    slug: "product-handling-storage-standards",
    title: "Product Handling & Storage Standards",
    effectiveDate: "January 1, 2026",
    eyebrow: "Quality policy",
    isPlaceholder: false,
    description:
      "How The Funni Farm strives to handle, store, rotate, package, and review products before shipment.",
    notice: reviewNotice,
    pdfUrl: "/policies/product-handling-and-storage-standards.pdf",
    sections: [
      {
        title: "Purpose",
        body: "These standards describe how The Funni Farm strives to handle and store products before they are shipped to customers.",
      },
      {
        title: "Storage Conditions",
        body: "Products are stored in clean, dry areas and protected from excessive heat, moisture, sunlight, and contamination whenever reasonably practicable.",
      },
      {
        title: "Inventory Rotation",
        body: "Inventory is rotated to promote shipment of older eligible inventory before newer inventory where practical.",
      },
      {
        title: "Packaging Protection",
        body: "Products are packaged to help reduce damage during normal shipping and handling.",
      },
      {
        title: "Damaged Inventory",
        body: "Products showing signs of damage, contamination, or compromised packaging are removed from sale whenever identified.",
      },
      {
        title: "Continuous Review",
        body: "Our storage and handling procedures are periodically reviewed and updated as our operations grow and improve.",
      },
      { title: "Contact", body: contactBlock },
    ],
  },
  {
    slug: "product-traceability",
    title: "Product Traceability Policy",
    effectiveDate: "January 1, 2026",
    eyebrow: "Quality policy",
    isPlaceholder: false,
    description:
      "Traceability procedures for ingredients, production batches, finished products, and customer assistance.",
    notice: reviewNotice,
    pdfUrl: "/policies/product-traceability-policy.pdf",
    sections: [
      {
        title: "Purpose",
        body: "The Funni Farm maintains product traceability procedures to help identify ingredients, production batches, and finished products throughout normal business operations.",
      },
      {
        title: "Batch Identification",
        body: "Finished products are assigned a batch or lot number whenever applicable to assist with quality assurance and customer support.",
      },
      {
        title: "Production Records",
        body: "We maintain production records, ingredient information, and related documentation to support consistency and traceability.",
      },
      {
        title: "Customer Assistance",
        body: "Customers requesting information about a product should provide the batch or lot number from the package whenever possible.",
      },
      {
        title: "Quality Reviews",
        body: "Traceability information may be used during quality investigations, customer inquiries, or product reviews.",
      },
      {
        title: "Continuous Improvement",
        body: "We periodically review our traceability practices and update procedures as our business grows and regulatory expectations evolve.",
      },
      { title: "Contact", body: contactBlock },
    ],
  },
  {
    slug: "transparency-customer-trust",
    title: "Transparency & Customer Trust Statement",
    effectiveDate: "January 1, 2026",
    eyebrow: "Customer trust",
    isPlaceholder: false,
    description:
      "The Funni Farm's commitment to clear product information, lab testing, open communication, and improvement.",
    notice: reviewNotice,
    pdfUrl: "/policies/transparency-and-customer-trust-statement.pdf",
    sections: [
      {
        title: "Our Commitment",
        body: "The Funni Farm is committed to operating with honesty, transparency, and integrity in every aspect of our business.",
      },
      {
        title: "Product Information",
        body: "We strive to provide clear product descriptions, ingredient information, batch identification, and other details to help customers make informed purchasing decisions.",
      },
      {
        title: "Laboratory Testing",
        body: "Where applicable, we support our products with independent third-party laboratory testing and make Certificates of Analysis (COAs) available when possible.",
      },
      {
        title: "Open Communication",
        body: "We welcome customer questions and feedback. If we make a mistake, we will work in good faith to address it fairly and professionally.",
      },
      {
        title: "Continuous Improvement",
        body: "Customer feedback helps us improve our products, packaging, website, and customer service. We regularly review our practices to better serve our customers.",
      },
      { title: "Contact", body: contactBlock },
    ],
  },
  {
    slug: "supplier-ingredient-standards",
    title: "Supplier & Ingredient Standards Policy",
    effectiveDate: "January 1, 2026",
    eyebrow: "Quality policy",
    isPlaceholder: false,
    description:
      "Supplier selection, ingredient quality, documentation, evaluation, and customer questions.",
    notice: reviewNotice,
    pdfUrl: "/policies/supplier-and-ingredient-standards-policy.pdf",
    sections: [
      {
        title: "Purpose",
        body: "The Funni Farm strives to source ingredients, packaging, and materials from reputable suppliers that support our commitment to quality, consistency, and compliance.",
      },
      {
        title: "Supplier Selection",
        body: "Potential suppliers may be evaluated based on product quality, reliability, regulatory compliance, documentation, and business practices.",
      },
      {
        title: "Ingredient Quality",
        body: "We seek ingredients that meet our product specifications and applicable legal requirements. Ingredient availability may change over time.",
      },
      {
        title: "Documentation",
        body: "Where appropriate, supplier documentation such as specifications, lot information, or laboratory reports may be maintained to support product traceability.",
      },
      {
        title: "Continuous Evaluation",
        body: "Supplier performance may be reviewed periodically. We may discontinue using suppliers that no longer meet our standards or business needs.",
      },
      {
        title: "Questions",
        body: "Customers with questions about ingredients or sourcing are encouraged to contact us. We will provide appropriate information when available.",
      },
      { title: "Contact", body: contactBlock },
    ],
  },
  {
    slug: "record-retention",
    title: "Record Retention Policy",
    effectiveDate: "January 1, 2026",
    eyebrow: "Operations policy",
    isPlaceholder: false,
    description:
      "Business records, retention periods, confidentiality, secure disposal, and policy updates.",
    notice: reviewNotice,
    pdfUrl: "/policies/record-retention-policy.pdf",
    sections: [
      {
        title: "Purpose",
        body: "The Funni Farm maintains business records to support customer service, product traceability, regulatory compliance, accounting, and normal business operations.",
      },
      {
        title: "Records Maintained",
        body: "Records may include customer orders, invoices, shipping records, batch and lot information, Certificates of Analysis (COAs), supplier documentation, and customer communications.",
      },
      {
        title: "Retention Periods",
        body: "Business records are retained for commercially reasonable periods or as otherwise required by applicable law.",
      },
      {
        title: "Confidentiality",
        body: "Records containing personal or confidential information are protected using reasonable administrative and technical safeguards.",
      },
      {
        title: "Secure Disposal",
        body: "When records are no longer required, they are disposed of using reasonable methods intended to protect confidential information.",
      },
      {
        title: "Policy Updates",
        body: "This policy may be updated periodically to reflect changes in legal requirements or business practices.",
      },
      { title: "Contact", body: contactBlock },
    ],
  },
];
