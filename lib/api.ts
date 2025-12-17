import axios from "axios";
import type { Camper, CampersResponse } from "@/types/campers";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

export type EquipmentKey = "AC" | "kitchen" | "bathroom" | "TV" | "automatic";
export type VehicleTypeValue = "panelTruck" | "fullyIntegrated" | "alcove";

export type ApiFilters = {
  location?: string;
  form?: VehicleTypeValue;
  eq?: EquipmentKey[];
};

export async function getCampers(filters?: ApiFilters): Promise<Camper[]> {
  const params: Record<string, string> = {};
  if (filters?.location) params.location = filters.location;

  if (filters?.form) params.form = filters.form;

  for (const key of filters?.eq ?? []) {
    if (key === "automatic") {
      params.transmission = "automatic";
    } else {
      params[key] = "true";
    }
  }

  const { data } = await api.get<CampersResponse>("/campers", { params });
  return data.items;
}

export async function getLocations(
  filters?: Omit<ApiFilters, "location">
): Promise<string[]> {
  const items = await getCampers({
    form: filters?.form,
    eq: filters?.eq,
  });

  const set = new Set(items.map((x) => x.location));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}
