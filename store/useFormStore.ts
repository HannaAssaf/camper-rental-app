import { create } from "zustand";
import { persist } from "zustand/middleware";

export type BookingDraft = {
  name: string;
  email: string;
  comment: string;
};

type FormStore = {
  draft: BookingDraft;
  setField: (field: keyof BookingDraft, value: string) => void;
  clear: () => void;
};

const initialDraft: BookingDraft = {
  name: "",
  email: "",
  comment: "",
};

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setField: (field, value) =>
        set((state) => ({
          draft: {
            ...state.draft,
            [field]: value,
          },
        })),
      clear: () => set({ draft: initialDraft }),
    }),
    {
      name: "booking-form-draft",
      partialize: (s) => ({ draft: s.draft }),
    }
  )
);
