"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import css from "./Filter.module.css";
import { useClickOutside } from "@/hooks/useClickOutside";
import {
  vehicleTypes,
  equipmentOptions,
  type EquipmentKey,
  type VehicleTypeValue,
} from "@/types/features";
import { useCampersStore } from "@/store/useCampersStore";
import { getLocations } from "@/lib/api";
import Icon from "../Icon/Icon";

function parseCsv(value: string | null): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

function buildQueryString(params: {
  location?: string;
  form?: VehicleTypeValue | null;
  eq?: string[];
}) {
  const sp = new URLSearchParams();
  if (params.location) sp.set("location", params.location);
  if (params.form) sp.set("form", params.form);
  if (params.eq?.length) sp.set("eq", params.eq.join(","));
  const qs = sp.toString();
  return qs ? `?${qs}` : "";
}

const EQUIPMENT_KEYS = new Set<EquipmentKey>(
  equipmentOptions.map((x) => x.key)
);

function toEquipmentKeys(xs: string[]): EquipmentKey[] {
  return xs.filter((x): x is EquipmentKey =>
    EQUIPMENT_KEYS.has(x as EquipmentKey)
  );
}

export default function Filter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters = useCampersStore((s) => s.filters);
  const setFilters = useCampersStore((s) => s.setFilters);

  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const locationRef = useRef<HTMLDivElement>(null);
  useClickOutside(locationRef, () => setIsLocationOpen(false));

  const appliedForm =
    (searchParams.get("form") as VehicleTypeValue | null) ?? null;
  const appliedEq = toEquipmentKeys(parseCsv(searchParams.get("eq")));
  const eqKey = appliedEq.slice().sort().join(",");

  const { data: allLocations = [] } = useQuery({
    queryKey: ["locations", appliedForm, eqKey],
    queryFn: () =>
      getLocations({
        form: appliedForm || undefined,
        eq: appliedEq.length ? appliedEq : undefined,
      }),
    staleTime: 60_000,
    gcTime: 5 * 60_000,
  });

  useEffect(() => {
    const hasAnyParam =
      searchParams.has("location") ||
      searchParams.has("form") ||
      searchParams.has("eq");

    if (!hasAnyParam) return;

    const urlLocation = searchParams.get("location") ?? "";
    const urlForm =
      (searchParams.get("form") as VehicleTypeValue | null) ?? null;
    const urlEq = toEquipmentKeys(parseCsv(searchParams.get("eq")));

    setFilters({
      location: urlLocation,
      equipment: urlEq,
      vehicleType: urlForm,
    });
  }, [searchParams, setFilters]);

  const filteredLocations = useMemo(() => {
    const q = filters.location.trim().toLowerCase();
    if (!q) return allLocations;
    return allLocations.filter((l) => l.toLowerCase().includes(q));
  }, [allLocations, filters.location]);

  const selectLocation = (value: string) => {
    setFilters({ ...filters, location: value });
    setIsLocationOpen(false);
    const qs = buildQueryString({ location: value });
    router.replace(`/campers${qs}`);
  };

  const toggleEquipment = (key: EquipmentKey) => {
    const next = filters.equipment.includes(key)
      ? filters.equipment.filter((x) => x !== key)
      : [...filters.equipment, key];

    setFilters({ ...filters, equipment: next });
  };

  const selectVehicleType = (value: VehicleTypeValue) => {
    setFilters({
      ...filters,
      vehicleType: filters.vehicleType === value ? null : value,
    });
  };

  const onSearch = () => {
    const qs = buildQueryString({
      location: filters.location,
      form: filters.vehicleType,
      eq: filters.equipment,
    });
    router.replace(`/campers${qs}`);
  };

  const onReset = () => {
    setFilters({ location: "", equipment: [], vehicleType: null });
    router.replace("/campers");
  };

  return (
    <div className={css.sidebar}>
      {/* Location */}
      <div className={css.group}>
        <label className={css.label}>Location</label>

        <div className={css.locationWrap} ref={locationRef}>
          <div className={css.locationInput}>
            <span className={css.locationIcon} aria-hidden="true" />
            <input
              className={css.inputField}
              value={filters.location}
              placeholder="City"
              onChange={(e) => {
                setFilters({ ...filters, location: e.target.value });
                setIsLocationOpen(true);
              }}
              onFocus={() => setIsLocationOpen(true)}
            />
          </div>

          {isLocationOpen && (
            <div className={css.dropdown} role="listbox">
              {filteredLocations.length ? (
                filteredLocations.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={css.dropdownItem}
                    onClick={() => selectLocation(item)}
                  >
                    {item}
                  </button>
                ))
              ) : (
                <div className={css.dropdownEmpty}>No matches</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className={css.group}>
        <p className={css.title}>Filters</p>

        <p className={css.subTitle}>Vehicle equipment</p>
        <div className={css.grid}>
          {equipmentOptions.map((opt) => (
            <button
              key={opt.key}
              type="button"
              className={`${css.chip} ${
                filters.equipment.includes(opt.key) ? css.active : ""
              }`}
              onClick={() => toggleEquipment(opt.key)}
            >
              <Icon
                name={opt.icon}
                className={css.icon}
                width={28}
                height={28}
              />
              <span className={css.chipLabel}>{opt.label}</span>
            </button>
          ))}
        </div>

        <p className={css.subTitle}>Vehicle type</p>
        <div className={css.grid}>
          {vehicleTypes.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`${css.chip} ${
                filters.vehicleType === opt.value ? css.active : ""
              }`}
              aria-pressed={filters.vehicleType === opt.value}
              onClick={() => selectVehicleType(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className={css.actions}>
          <button className={css.searchBtn} onClick={onSearch}>
            Search
          </button>
          <button className={css.resetBtn} onClick={onReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
