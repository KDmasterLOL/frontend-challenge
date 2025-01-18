import { InifityScrollCats } from "@/components";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "Все котики",
  };
}

export default function Home() {
  return (
    <article>
      <InifityScrollCats catsKey="cats"></InifityScrollCats>
    </article>
  );
}
