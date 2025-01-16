"use client";
import { CatsList } from "@/components";
import { useCatStore } from "@/store/store";
import { useEffect } from "react";

export default function Home() {
  const state = useCatStore();
  useEffect(() => {
    console.log("Load cats");
    state.loadCats();
  }, []);

  return <CatsList cats={state.cats}></CatsList>;
}
