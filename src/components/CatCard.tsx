"use client";
import { Like } from "@/icons";
import { useCatStore } from "@/store/store";
import { Cat } from "@/types";
import Button from "./ButtonWithShadow";
import Image from "next/image";
import { HTMLAttributes, useCallback, useRef, useState } from "react";
import ReactCardFlip from "react-card-flip";
import { confetti } from "@tsparticles/confetti";

export default function CatCard({
  cat,
  className = "",
  ...props
}: HTMLAttributes<HTMLElement> & { cat: Cat }) {
  const { favorite, unfavorite, favorites } = useCatStore();
  const [isLoaded, setIsLoaded] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const emitConfetti = useCallback(() => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const x = buttonRect.left + buttonRect.width / 2;
      const y = buttonRect.top + buttonRect.height / 2;
      confetti({
        position: {
          x: (x / window.innerWidth) * 100,
          y: (y / window.innerHeight) * 100,
        },
        angle: 90,
        count: 30,
        spread: 45,
        startVelocity: 60,
        decay: 0.8,
        gravity: 0.6,
        drift: 0.2,
        ticks: 600,
        colors: ["#ffffff", "#ff0000"],
        shapes: ["hearts"],
        scalar: 4,
        zIndex: 100,
        disableForReducedMotion: true,
      });
    }
  }, []);
  const is_favorite = favorites.some((c) => c.id == cat.id);
  const onClick = () => {
    console.log("FAVORITE", cat, favorites, is_favorite);
    if (is_favorite == false) {
      favorite(cat);
      emitConfetti();
    } else unfavorite(cat);
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
      <Button
        onClick={onClick}
        className="!absolute bottom-4 right-4 transition-[opacity,transform] duration-500 ease-out opacity-0 group-hover:opacity-100 active:scale-125"
        shadow={<Like className="text-blue-900"></Like>}
        maxShadowDistance={2}
        cursorDistance={100}
        minBlur={1}
        maxBlur={4}
        ref={buttonRef}
      >
        <Like filled={is_favorite}></Like>
      </Button>
    </article>
  );
}
