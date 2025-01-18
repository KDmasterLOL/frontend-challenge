"use client";
import { Cats } from "@/types";
import CatCard from "./CatCard";
import { HTMLAttributes, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ANIMATION_DELAY } from "@/lib";
import { ANIMATION_DURATION, PAGE_ANIMATION_TIME } from "@/lib/constants";
import { useMeasure } from "@uidotdev/usehooks";

export default function CatsList({
  cats,
  className = "",
  ...props
}: HTMLAttributes<HTMLElement> & { cats: Cats }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, { height }] = useMeasure();

  useEffect(() => {
    if (currentIndex < cats.length) {
      const timer = setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, ANIMATION_DELAY * 1000);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, cats.length]);

  return (
    //@ts-expect-error this strange
    <motion.section
      {...props}
      className={className + "p-4 mx-auto  max-w-[1440px]"}
      transition={{ duration: PAGE_ANIMATION_TIME / 2 }}
    >
      <div
        className="grid grid-cols-[repeat(auto-fit,clamp(150px,15.6vw,225px))] auto-rows-[clamp(150px,15.6vw,225px)] justify-center gap-6 sm:gap-12"
        ref={ref}
      >
        <AnimatePresence>
          {cats.map((c, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: 30 }}
              animate={i <= currentIndex ? { scale: 1, rotate: 0 } : {}}
              transition={{
                duration: ANIMATION_DURATION,
                type: "spring",
                bounce: 0.4,
              }}
            >
              <CatCard className="size-full " cat={c} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
