import { CurrentFormType } from "@/src/types/form/currentForm";
import { create } from "zustand";

interface CurrentFormStroreInterface {
  currentForm: CurrentFormType | null;
  setCurrentFormData: (data: CurrentFormType | null) => void;
}

export const CurrentFormStore = create<CurrentFormStroreInterface>()((set) => ({
  currentForm: null,
  inputs: [],
  setCurrentFormData: (data) => {
    if (data === null) return set({ currentForm: null });
    else {
      data.hasChildrens =
        data && "hasChildrens" in data ? data.hasChildrens : false;
      return set({
        currentForm: data,
      });
    }
  },
}));
