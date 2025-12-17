import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { EquipmentKey, VehicleTypeValue } from "@/types/features";

export type Filters = {
  location: string;
  equipment: EquipmentKey[];
  vehicleType: VehicleTypeValue | null;
};

type State = {
  filters: Filters;
  setFilters: (next: Filters) => void;
  setPartialFilters: (patch: Partial<Filters>) => void;
  resetFilters: () => void;
};

const initialFilters: Filters = {
  location: "",
  equipment: [],
  vehicleType: null,
};

export const useCampersStore = create<State>()(
  persist(
    (set) => ({
      filters: initialFilters,

      setFilters: (next) => set({ filters: next }),

      setPartialFilters: (patch) =>
        set((state) => ({ filters: { ...state.filters, ...patch } })),

      resetFilters: () => set({ filters: initialFilters }),
    }),
    {
      name: "campers-filters",
      partialize: (state) => ({ filters: state.filters }),
    }
  )
);
