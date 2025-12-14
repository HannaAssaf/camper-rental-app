export interface VehicleGalleryItem {
  thumb: string;
  original: string;
}

export interface VehicleReview {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

export interface Vehicle {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: "manual" | "automatic";
  engine: "diesel" | "petrol";
  AC: boolean;
  bathroom: boolean;
  kitchen: boolean;
  TV: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;
  gallery: VehicleGalleryItem[];
  reviews: VehicleReview[];
}
