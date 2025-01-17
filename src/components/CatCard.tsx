"use client";
import { Like } from "@/icons";
import { useCatStore } from "@/store/store";
import { Cat } from "@/types";
import Image from "next/image";
import { HTMLAttributes, useState } from "react";
import ReactCardFlip from "react-card-flip";

export default function CatCard({
  cat,
  className = "",
  ...props
}: HTMLAttributes<HTMLElement> & { cat: Cat }) {
  const { favorite, unfavorite, favorites } = useCatStore();
  const [isLoaded, setIsLoaded] = useState(false);
  const is_favorite = favorites.some((c) => c.id == cat.id);
  const onClick = () => {
    if (is_favorite == false) favorite(cat);
    else unfavorite(cat);
  };

  return (
    <article
      className={
        "relative group transition-[box-shadow,transform] duration-500 hover:scale-[114%] hover:shadow-[0_4px_4px_0_black] " +
        className
      }
      {...props}
    >
      <ReactCardFlip
        containerClassName="size-full"
        isFlipped={isLoaded}
        flipDirection="horizontal"
      >
        <Image
          src="/placeholder.png"
          width={225}
          height={225}
          className="size-full [image-rendering:pixelated]"
          alt=""
        />
        <Image
          src={cat.url}
          width={225}
          height={225}
          className="size-full"
          priority={true}
          alt=""
          onLoad={() => setIsLoaded(true)}
        />
      </ReactCardFlip>
      <button
        onClick={onClick}
        className="absolute bottom-4 right-4 transition-opacity duration-500 ease-out opacity-0 group-hover:block group-hover:opacity-100"
      >
        <Like filled={is_favorite}></Like>
      </button>
    </article>
  );
}
