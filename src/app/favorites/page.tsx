import { InifityScrollCats } from "@/components";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "Любимые котики",
  };
}

export default function Favorites() {
  return (
    <article>
      <InifityScrollCats catsKey="favorites"></InifityScrollCats>
    </article>
  );
}
