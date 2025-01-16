import { get_random_images } from "@/api";
import _ from "lodash";
import { Cat, Cats } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
interface CatStore {
  cats: Cats;
  favorites: Cats;
  favorite: (cat: Cat) => void;
  unfavorite: (cat: Cat) => void;
  loadCats: () => void;
}
const page_size = 10;
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
            favorites: state.favorites.filter((v) => v != cat),
          };
        });
      },
      loadCats: async () => {
        const next_page = Math.floor(get().cats.length / page_size);
        const cats = await get_random_images(page_size, next_page);
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
