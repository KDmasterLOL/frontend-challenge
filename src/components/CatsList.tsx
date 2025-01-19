"use client";
import { Cats } from "@/types";
import CatCard from "./CatCard";
import { HTMLAttributes, useEffect, useState } from "react";
import { ANIMATION_DELAY } from "@/lib";

export default function CatsList({
  cats,
  className = "",
  ...props
}: HTMLAttributes<HTMLElement> & { cats: Cats }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < cats.length) {
      const timer = setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, ANIMATION_DELAY * 1000);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, cats.length]);

  return (
    <section {...props} className={className + "p-4 mx-auto  max-w-[1440px]"}>
      <div className="grid grid-cols-[repeat(auto-fit,clamp(150px,15.6vw,225px))] auto-rows-[clamp(150px,15.6vw,225px)] justify-center gap-6 sm:gap-12">
        {cats.map((c, i) => (
          <div
            key={i}
            className={
              "size-full " +
              (i <= currentIndex ? "animate-zoomInRotate" : "opacity-0")
            }
          >
            <CatCard className="size-full" cat={c} />
          </div>
        ))}
      </div>
    </section>
  );
}
