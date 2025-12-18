"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";

import CampersList from "@/components/CampersList/CampersList";
import { getCampers } from "@/lib/api";
import {
  equipmentOptions,
  type EquipmentKey,
  type VehicleTypeValue,
} from "@/types/features";
import Button from "@/components/Button/Button";
import css from "./CampersLayout.module.css";

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

const LIMIT = 4;

export default function CampersListClient() {
  const sp = useSearchParams();

  const location = sp.get("location") ?? "";
  const form = (sp.get("form") as VehicleTypeValue | null) ?? null;
  const eq = useMemo(() => toEquipmentKeys(parseCsv(sp.get("eq"))), [sp]);

  const eqKey = eq.slice().sort().join(",");

  const filters = useMemo(
    () => ({
      location: location || undefined,
      form: form || undefined,
      eq: eq.length ? eq : undefined,
    }),
    [location, form, eq]
  );

  const {
    data,
    isLoading,
    isFetching,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["campers", filters.location ?? "", filters.form ?? "", eqKey],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getCampers(filters, pageParam, LIMIT),
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce((sum, p) => sum + p.items.length, 0);

      if (Number.isFinite(lastPage.total) && lastPage.total > 0) {
        return loaded < lastPage.total ? lastPage.page + 1 : undefined;
      }

      return lastPage.items.length === lastPage.limit
        ? lastPage.page + 1
        : undefined;
    },
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  const items = data?.pages.flatMap((p) => p.items) ?? [];
  const isEmpty = !isFetching && items.length === 0;

  return (
    <>
      {isFetching && !isFetchingNextPage && (
        <p style={{ marginBottom: 12 }}>Updating results...</p>
      )}

      {isEmpty ? (
        <p>No campers match your search.</p>
      ) : (
        <>
          <CampersList campers={items} />

          <div className={css.buttonPgn}>
            {hasNextPage && (
              <Button variant="pagination" onClick={() => fetchNextPage()}>
                {isFetchingNextPage ? "Loading..." : "Load More"}
              </Button>
            )}
          </div>
        </>
      )}
    </>
  );
}
