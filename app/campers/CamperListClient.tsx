"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import CampersList from "@/components/CampersList/CampersList";
import { getCampers } from "@/lib/api";
import {
  equipmentOptions,
  type EquipmentKey,
  type VehicleTypeValue,
} from "@/types/features";

function parseCsv(value: string | null): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

const EQUIPMENT_KEYS = new Set<EquipmentKey>(
  equipmentOptions.map((x) => x.key)
);
function toEquipmentKeys(xs: string[]): EquipmentKey[] {
  return xs.filter((x): x is EquipmentKey =>
    EQUIPMENT_KEYS.has(x as EquipmentKey)
  );
}

export default function CampersListClient() {
  const sp = useSearchParams();

  const location = sp.get("location") ?? "";
  const form = (sp.get("form") as VehicleTypeValue | null) ?? null;
  const eq = useMemo(() => toEquipmentKeys(parseCsv(sp.get("eq"))), [sp]);

  const eqKey = eq.slice().sort().join(",");

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["campers", location, form, eqKey],
    queryFn: () =>
      getCampers({
        location: location || undefined,
        form: form || undefined,
        eq: eq.length ? eq : undefined,
      }),
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  const items = data ?? [];

  return (
    <>
      {isFetching && <p style={{ marginBottom: 12 }}>Updating results...</p>}
      <CampersList campers={items} />
      {!items.length && <p>No campers found.</p>}
    </>
  );
}
