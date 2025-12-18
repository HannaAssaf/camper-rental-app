import axios from "axios";
import type { Camper, CampersResponse } from "@/types/campers";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10_000,
});

export type EquipmentKey = "AC" | "kitchen" | "bathroom" | "TV" | "automatic";
export type VehicleTypeValue = "panelTruck" | "fullyIntegrated" | "alcove";

export type ApiFilters = {
  location?: string;
  form?: VehicleTypeValue;
  eq?: EquipmentKey[];
};

export type CamperListResult = {
  items: Camper[];
  total: number;
  page: number;
  limit: number;
};

function configParams(
  filters: ApiFilters | undefined,
  page: number,
  limit: number
) {
  const params: Record<string, string | number> = { page, limit };

  if (filters?.location) params.location = filters.location;
  if (filters?.form) params.form = filters.form;

  for (const key of filters?.eq ?? []) {
    if (key === "automatic") {
      params.transmission = "automatic";
    } else {
      params[key] = "true";
    }
  }

  return params;
}

export async function getCampers(
  filters?: ApiFilters,
  page = 1,
  limit = 4
): Promise<CamperListResult> {
  const params = configParams(filters, page, limit);

  const res = await api.get<CampersResponse>("/campers", { params });

  const totalFromBody = res.data.total;
  const totalFromHeader = Number(res.headers?.["x-total-count"]);

  const total = Number.isFinite(totalFromBody)
    ? Number(totalFromBody)
    : Number.isFinite(totalFromHeader)
    ? totalFromHeader
    : res.data.items.length;
  return { items: res.data.items, total, page, limit };
}

export async function getLocations(
  filters?: Omit<ApiFilters, "location">
): Promise<string[]> {
  const res = await getCampers(
    {
      form: filters?.form,
      eq: filters?.eq,
    },
    1,
    100
  );

  const set = new Set(res.items.map((x: Camper) => x.location));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}
