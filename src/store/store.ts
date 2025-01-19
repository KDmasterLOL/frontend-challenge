import { get_random_images } from "@/api";
import _ from "lodash";
import { Cat, Cats } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PAGE_SIZE } from "@/lib/constants";
export interface CatStore {
  cats: Cats;
  favorites: Cats;
  favorite: (cat: Cat) => void;
  unfavorite: (cat: Cat) => void;
  loadCats: () => Promise<void>;
}
export const useCatStore = create<CatStore>()(
  persist(
    (set, get) => ({
      cats: [],
      favorites: [],
      favorite: (cat) => {
        return set((state) => {
          return {
            ...state,
            favorites: [...state.favorites.filter((c) => c.id != cat.id), cat],
          };
        });
      },
      unfavorite: (cat) => {
        return set((state) => {
          return {
            ...state,
            favorites: state.favorites.filter((v) => v.id != cat.id),
          };
        });
      },
      loadCats: async () => {
        const next_page = Math.floor(get().cats.length / PAGE_SIZE);
        const cats = await get_random_images(PAGE_SIZE, next_page);
        return set((state) => {
          return { ...state, cats: _.unionBy(state.cats, cats, "id") };
        });
      },
    }),
    {
      name: "cats-storage",
      partialize: (state) => ({
        favorites: state.favorites,
      }),
    },
  ),
);
