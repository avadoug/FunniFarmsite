export const jackFrostCoa = {
  id: "jack-frost-cbg-001",
  sampleName: "Jack Frost cbg_001",
  client: "The Funni Farm",
  clientCode: "EDIY-BHHM8P",
  clientAddress: "Woodlawn, TN",
  lab: "New Bloom Labs",
  sampleId: "11-10-2022-26986",
  sampleType: "Plant, Biomass",
  dateTested: "2022-11-10",
  dateTestedLabel: "11/10/2022",
  sampleReceivedLabel: "11/10/2022",
  reportCreated: "2022-11-15",
  reportCreatedLabel: "11/15/2022",
  expiration: "2023-11-15",
  expirationLabel: "11/15/2023",
  method: "HPLC, CON-P-3000",
  status: "Complete",
  image: {
    alt: "New Bloom Labs Certificate of Analysis for Jack Frost cbg_001 plant biomass sample.",
    caption:
      "Original COA image withheld from the public site to protect private address details; extracted lab data is shown below.",
    fullSrc: "",
    previewSrc: "",
  },
  summary:
    "This COA shows a hemp-compliance-focused plant/biomass sample with a standout CBGA signal, useful for CBG-rich education and transparency.",
  resultCards: [
    {
      label: "Total THC",
      value: "0.113%",
      meaning: "Very low total THC, useful for compliance-focused positioning.",
      tone: "green",
    },
    {
      label: "Delta-9 THC",
      value: "0.019%",
      meaning: "Extremely low measured Delta-9 THC.",
      tone: "green",
    },
    {
      label: "CBGA",
      value: "9.268%",
      meaning:
        "Strong CBGA precursor signal. This is the most interesting cannabinoid result on the report.",
      tone: "gold",
    },
    {
      label: "CBG",
      value: "0.201%",
      meaning:
        "Present CBG, with much of the CBG potential still showing as CBGA in this biomass sample.",
      tone: "cream",
    },
    {
      label: "CBC + CBCA",
      value: "0.039% / 0.302%",
      meaning: "Minor cannabinoid presence that adds educational interest.",
      tone: "cream",
    },
    {
      label: "CBD / CBN / Delta-8",
      value: "ND",
      meaning: "Not detected in this test.",
      tone: "cream",
    },
  ],
  cannabinoids: [
    {
      name: "Total THC",
      value: "0.113%",
      highlight: true,
      note: "Calculated total THC result; low in this tested sample.",
    },
    {
      name: "Delta-8 THC",
      value: "ND",
      note: "Not detected.",
    },
    {
      name: "Delta-9 THC",
      value: "0.019%",
      highlight: true,
      note: "Very low measured Delta-9 THC.",
    },
    {
      name: "THCA-A",
      value: "0.107%",
      note: "Acidic THC precursor shown at a low level.",
    },
    {
      name: "THCV",
      value: "ND",
      note: "Not detected.",
    },
    {
      name: "THCVA",
      value: "ND",
      note: "Not detected.",
    },
    {
      name: "CBDV",
      value: "ND",
      note: "Not detected.",
    },
    {
      name: "CBDVA",
      value: "ND",
      note: "Not detected.",
    },
    {
      name: "CBD",
      value: "ND",
      note: "Not detected.",
    },
    {
      name: "CBDA",
      value: "0.056%",
      note: "Low CBDA presence.",
    },
    {
      name: "CBG",
      value: "0.201%",
      highlight: true,
      note: "Detected CBG.",
    },
    {
      name: "CBGA",
      value: "9.268%",
      highlight: true,
      note: "Standout result and the strongest cannabinoid signal on this COA.",
    },
    {
      name: "CBN",
      value: "ND",
      note: "Not detected.",
    },
    {
      name: "CBNA",
      value: "ND",
      note: "Not detected.",
    },
    {
      name: "CBC",
      value: "0.039%",
      note: "Minor cannabinoid detected.",
    },
    {
      name: "CBCA",
      value: "0.302%",
      note: "Minor acidic cannabinoid detected.",
    },
  ],
  glossary: [
    {
      term: "Total THC",
      definition:
        "A calculated THC value that combines Delta-9 THC with converted THCA using the lab formula shown on the COA.",
    },
    {
      term: "Delta-9 THC",
      definition:
        "The measured Delta-9 THC value. This COA reports a very low result of 0.019%.",
    },
    {
      term: "THCA",
      definition:
        "An acidic THC precursor found in plant material. This COA reports THCA-A at 0.107%.",
    },
    {
      term: "CBG",
      definition:
        "Cannabigerol. This sample has detected CBG, while much of its CBG potential appears in CBGA form.",
    },
    {
      term: "CBGA",
      definition:
        "A major acidic precursor cannabinoid. In this COA, CBGA is the standout result at 9.268%, making the sample more useful as a CBG-rich transparency example than as broad potency marketing.",
    },
    {
      term: "CBC",
      definition:
        "Cannabichromene, a minor cannabinoid detected at a low level on this report.",
    },
    {
      term: "CBCA",
      definition:
        "Cannabichromenic acid, an acidic cannabinoid detected at 0.302% on this report.",
    },
    {
      term: "ND / Not Detected",
      definition:
        "The lab did not detect that cannabinoid above the reportable threshold for this test.",
    },
    {
      term: "LOD",
      definition:
        "Limit of Detection, meaning the lowest level the method can reliably notice.",
    },
    {
      term: "LOQ",
      definition:
        "Limit of Quantitation, meaning the lowest level the method can reliably measure and report as a number.",
    },
  ],
} as const;
