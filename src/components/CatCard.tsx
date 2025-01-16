"use client";
import { Like } from "@/icons";
import { useCatStore } from "@/store/store";
import { Cat } from "@/types";
import Image from "next/image";

export default function CatCard({ cat }: { cat: Cat }) {
  const { favorite, unfavorite, favorites } = useCatStore();
  const is_favorite = favorites.some((c) => c.id == cat.id);
  const onClick = () => {
    console.log("AAA CLICK");
    console.log("Favorites is ", favorites, cat);
    if (is_favorite == false) favorite(cat);
    else unfavorite(cat);
  };

  return (
    <article>
      <Image
        src={cat.url}
        width={100}
        height={100}
        loading="lazy"
        className="size-full"
        priority={false}
        alt=""
      ></Image>
      <button onClick={onClick}>
        <Like filled={is_favorite}></Like>
      </button>
    </article>
  );
}
