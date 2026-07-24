export interface MarketplaceListing {
  id: string;
  farmName: string;
  location: string;
  variety: string;
  grade: string;
  quantityKg: number;
  pricePerKg: number;
  harvestDate: string;
  certifications: string[];
  imageUrl: string;
}

export const MARKETPLACE_LISTINGS: MarketplaceListing[] = [
  {
    id: "l1",
    farmName: "Hillcrest Estate",
    location: "Chikmagalur, India",
    variety: "Arabica",
    grade: "AA",
    quantityKg: 2400,
    pricePerKg: 400,
    harvestDate: "Jan 2026",
    certifications: ["Organic"],
    imageUrl: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
  },
  {
    id: "l2",
    farmName: "Rio Verde Fazenda",
    location: "Minas Gerais, Brazil",
    variety: "Arabica",
    grade: "Specialty 84+",
    quantityKg: 8200,
    pricePerKg: 465,
    harvestDate: "Jun 2026",
    certifications: ["Rainforest Alliance"],
    imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
  },
  {
    id: "l3",
    farmName: "Cao Nguyen Plot 4",
    location: "Dak Lak, Vietnam",
    variety: "Robusta",
    grade: "Grade 1 Screen 18",
    quantityKg: 5100,
    pricePerKg: 190,
    harvestDate: "Nov 2025",
    certifications: [],
    imageUrl: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80",
  },
  {
    id: "l4",
    farmName: "Sidamo Heritage Co-op",
    location: "Sidama, Ethiopia",
    variety: "Heirloom Arabica",
    grade: "Grade 1 Washed",
    quantityKg: 1800,
    pricePerKg: 595,
    harvestDate: "Feb 2026",
    certifications: ["Fair Trade", "Organic"],
    imageUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80",
  },
  {
    id: "l5",
    farmName: "Finca La Esperanza",
    location: "Huila, Colombia",
    variety: "Washed Arabica",
    grade: "Supremo",
    quantityKg: 3600,
    pricePerKg: 505,
    harvestDate: "Apr 2026",
    certifications: ["Fair Trade"],
    imageUrl: "https://images.unsplash.com/photo-1442550528053-c431ecb55509?w=800&q=80",
  },
  {
    id: "l6",
    farmName: "Kiliman Growers Collective",
    location: "Chikmagalur, India",
    variety: "Robusta",
    grade: "Grade 2",
    quantityKg: 4300,
    pricePerKg: 170,
    harvestDate: "Dec 2025",
    certifications: [],
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
  },
];
