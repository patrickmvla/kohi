import { create } from "zustand";

export type Sort = "recent" | "alpha";

type State = {
  q: string;
  categories: string[];
  sort: Sort;
  isMac: boolean;
  initialized: boolean;
};

type Actions = {
  setQ: (q: string) => void;
  setCategories: (cats: string[]) => void;
  addCategory: (cat: string) => void;
  removeCategory: (cat: string) => void;
  setSort: (sort: Sort) => void;
  setIsMac: (v: boolean) => void;
  setInitialized: (v: boolean) => void;
  clear: () => void;
};

export const useProjectsExplorer = create<State & Actions>((set, get) => ({
  q: "",
  categories: [],
  sort: "recent",
  isMac: false,
  initialized: false,

  setQ: (q) => set({ q }),
  setCategories: (categories) => set({ categories }),
  addCategory: (cat) => {
    const next = new Set(get().categories);
    next.add(cat);
    set({ categories: Array.from(next) });
  },
  removeCategory: (cat) =>
    set({ categories: get().categories.filter((c) => c !== cat) }),

  setSort: (sort) => set({ sort }),
  setIsMac: (isMac) => set({ isMac }),
  setInitialized: (initialized) => set({ initialized }),

  clear: () => set({ q: "", categories: [], sort: "recent" }),
}));