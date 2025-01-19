import { HTMLAttributes } from "react";
import Link from "./Link";

export default function Header(props: HTMLAttributes<HTMLElement>) {
  const links = [
    {
      href: "/",
      display_name: "Все котики",
    },
    {
      href: "/favorites",
      display_name: "Любимые котики",
    },
  ];

  return (
    <header {...props}>
      <nav className="bg-primary-500 h-16">
        <ul className="px-[62px] flex h-full justify-stretch items-stretch">
          {links.map((v, i) => (
            <li key={i}>
              <Link
                href={v.href}
                className="text-sm flex items-center text-white/60 size-full px-5 transition-colors hover:!text-white"
                activeClassName="bg-primary-600 !text-white"
              >
                {v.display_name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
