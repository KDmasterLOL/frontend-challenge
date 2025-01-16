"use client";
import { CatsList } from "@/components";
import { useCatStore } from "@/store/store";

export default function Favorites() {
  const favorites = useCatStore((state) => state.favorites);
  return (
    <>
      <CatsList cats={favorites}></CatsList>
    </>
  );
}
