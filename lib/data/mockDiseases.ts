export interface DiseaseInfo {
  id: string;
  name: string;
  severity: "Low" | "Moderate" | "High";
  description: string;
  treatment: string[];
  recommendedProduct: string;
}

export const DISEASE_DATABASE: DiseaseInfo[] = [
  {
    id: "healthy",
    name: "No disease detected",
    severity: "Low",
    description:
      "Leaf color, texture, and spotting patterns are consistent with a healthy coffee plant.",
    treatment: [
      "Continue regular monitoring every 2 weeks",
      "Maintain current shade and irrigation schedule",
      "No fungicide application needed at this time",
    ],
    recommendedProduct: "None required",
  },
  {
    id: "leaf-rust",
    name: "Coffee Leaf Rust (Hemileia vastatrix)",
    severity: "High",
    description:
      "Orange-yellow powdery pustules on the underside of leaves, often leading to premature leaf drop if untreated.",
    treatment: [
      "Remove and destroy heavily infected leaves",
      "Improve canopy airflow by pruning dense growth",
      "Apply a copper-based fungicide at first sign of spread",
      "Re-inspect every 7–10 days during wet season",
    ],
    recommendedProduct: "Copper oxychloride fungicide (0.3% solution)",
  },
  {
    id: "berry-disease",
    name: "Coffee Berry Disease (Colletotrichum kahawae)",
    severity: "High",
    description:
      "Dark, sunken lesions on green cherries that can cause significant yield loss, especially in humid highland conditions.",
    treatment: [
      "Remove and destroy affected cherries immediately",
      "Apply protective fungicide before flowering season",
      "Avoid overhead irrigation which spreads spores",
      "Consider resistant Arabica varieties for future planting",
    ],
    recommendedProduct: "Chlorothalonil-based fungicide",
  },
  {
    id: "brown-eye-spot",
    name: "Brown Eye Spot (Cercospora coffeicola)",
    severity: "Moderate",
    description:
      "Circular brown spots with yellow halos on leaves, typically linked to nutrient deficiency and excessive sun exposure.",
    treatment: [
      "Increase shade cover if plants are sun-stressed",
      "Correct nitrogen and potassium deficiencies with balanced fertilizer",
      "Apply fungicide only if spread continues after nutrition correction",
    ],
    recommendedProduct: "Balanced NPK fertilizer + mancozeb fungicide",
  },
  {
    id: "anthracnose",
    name: "Anthracnose (Colletotrichum spp.)",
    severity: "Moderate",
    description:
      "Dark, irregular lesions on leaves and stems, often entering through wounds or during prolonged leaf wetness.",
    treatment: [
      "Prune and dispose of infected plant material",
      "Avoid working in the field during wet conditions",
      "Apply a broad-spectrum fungicide to prevent spread",
    ],
    recommendedProduct: "Broad-spectrum copper fungicide",
  },
];
