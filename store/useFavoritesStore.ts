import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoritesStore = {
  ids: string[];
  toggle: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((state) => ({
          ids: state.ids.includes(id)
            ? state.ids.filter((x) => x !== id)
            : [...state.ids, id],
        })),
      isFavorite: (id) => get().ids.includes(id),
    }),
    {
      name: "favorites",
      partialize: (s) => ({ ids: s.ids }),
    }
  )
);
