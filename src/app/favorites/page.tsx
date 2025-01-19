import { InifityScrollCats } from "@/components";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "Любимые котики",
  };
}

export default function Favorites() {
  return (
    <article className="py-2">
      <InifityScrollCats catsKey="favorites"></InifityScrollCats>
    </article>
  );
}
