"use client";
import { Cats } from "@/types";
import CatCard from "./CatCard";
import { HTMLAttributes, useEffect, useState } from "react";
import { ANIMATION_DELAY } from "@/lib";
import { AnimatePresence, motion } from "framer-motion";

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
      <ul className="grid grid-cols-[repeat(auto-fit,clamp(150px,15.6vw,225px))] auto-rows-[clamp(150px,15.6vw,225px)] justify-center gap-6 sm:gap-12">
        <AnimatePresence>
          {cats.map((c, i) => (
            <motion.li
              key={c.id}
              exit={{
                opacity: 0,
                transition: { delay: 0.1, duration: 0.2 },
              }}
              layout
              className={
                "size-full " +
                (i <= currentIndex ? "animate-zoomInRotate" : "opacity-0")
              }
            >
              <CatCard className="size-full" cat={c} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </section>
  );
}
