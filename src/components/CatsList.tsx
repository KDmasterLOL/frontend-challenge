import { Cats } from "@/types";
import CatCard from "./CatCard";
import { HTMLAttributes, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
      }, ANIMATION_DELAY * 1000); // Convert delay to milliseconds

      return () => clearTimeout(timer);
    }
  }, [currentIndex, cats.length]);

  return (
    <section
      {...props}
      className={
        "py-4 grid grid-cols-[repeat(auto-fit,150px)] auto-rows-[150px] sm:grid-cols-[repeat(auto-fit,225px)] sm:auto-rows-[225px]  justify-center gap-6 sm:gap-12 " +
        className
      }
    >
      <AnimatePresence>
        {cats.map((c, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: 30 }}
            animate={i <= currentIndex ? { scale: 1, rotate: 0 } : {}}
            transition={{
              duration: 1.5,
              type: "spring",
              bounce: 0.4,
            }}
          >
            <CatCard className="size-full" cat={c} />
          </motion.div>
        ))}
      </AnimatePresence>
    </section>
  );
}
