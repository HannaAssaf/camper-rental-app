import axios from "axios";
import type { Camper, CampersResponse } from "@/types/campers";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

export async function getCampers(): Promise<Camper[]> {
  const { data } = await api.get<CampersResponse>("/campers");
  return data.items;
}
