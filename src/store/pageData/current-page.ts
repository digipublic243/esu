import { DataActionsType } from "@/src/types/dataActions.type";
import { MenuPage } from "@/src/types/request/types/menu";
import { create } from "zustand";

interface CurrentMenuPageStroreInterface {
  page: MenuPage | null;
  actions: DataActionsType | null;
  setPage: (data: MenuPage) => void;
  setActions: (actions: DataActionsType | null) => void;
}

export const CurrentMenuPageStore = create<CurrentMenuPageStroreInterface>()(
  (set) => ({
    page: null,
    actions: null,
    setPage: (data) => set({ page: data }),
    setActions: (actions) => set({ actions: actions }),
  })
);
