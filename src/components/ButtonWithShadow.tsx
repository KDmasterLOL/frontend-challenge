"use client";
import React, {
  useEffect,
  useRef,
  HTMLAttributes,
  ReactNode,
  RefObject,
} from "react";
import { useTransform, motion, useSpring } from "framer-motion";
import { useHover } from "@uidotdev/usehooks";
import _ from "lodash";

export default function ButtonWithShadow({
  className = "",
  children,
  shadow,
  maxBlur = 3,
  minBlur = 0,
  maxShadowDistance = 2.5,
  cursorDistance = 300,
  ref: forwardRef,
  ...props
}: HTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  shadow: ReactNode;
  maxBlur?: number;
  minBlur?: number;
  maxShadowDistance?: number;
  cursorDistance?: number;
  ref?: RefObject<HTMLButtonElement | null>;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hoverRef, isHover] = useHover();

  const opacity = useSpring(1);
  const x = useSpring(0);
  const y = useSpring(0);
  const blur = useSpring(maxBlur, {
    duration: 0.6,
    velocity: 0,
  });
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  const handleMouseMove = (event: MouseEvent) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance > cursorDistance) {
        x.set(0);
        y.set(0);
        opacity.set(0);
      } else {
        opacity.set(1);

        const newBlur = ((maxBlur - minBlur) * distance) / cursorDistance;
        const shadowX =
          _.clamp(deltaX, -maxShadowDistance, maxShadowDistance) *
          (isHover ? 0.5 : -1);
        const shadowY =
          -_.clamp(deltaY, -maxShadowDistance, maxShadowDistance) *
          (isHover == false ? 1 : -0.5);
        x.set(shadowX);
        y.set(shadowY);
        blur.set(newBlur);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHover]);
  return (
    <button
      ref={(r) => {
        ref.current = r;
        hoverRef(r);
        if (forwardRef) forwardRef.current = r;
      }}
      className={"relative z-10 group/but " + className}
      {...props}
    >
      <motion.div
        className="absolute pointer-events-none z-[-1] group-hover/but:scale-150 transition-transform duration-500"
        style={{
          left: x,
          top: y,
          filter: filter,
          opacity,
        }}
      >
        {shadow}
      </motion.div>
      {children}
    </button>
  );
}
