"use client";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { ComponentProps } from "react";

// Wrapper around next link to add if active styling
export default function Link({
  className = "",
  activeClassName = "",
  ...props
}: ComponentProps<typeof NextLink> & { activeClassName?: string }) {
  const pathname = usePathname();

  const is_active = pathname == props.href;

  return (
    <NextLink
      {...props}
      className={className + " " + (is_active ? activeClassName : "")}
    ></NextLink>
  );
}
