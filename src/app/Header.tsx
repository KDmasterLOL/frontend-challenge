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
      <nav>
        <ul>
          {links.map((v, i) => (
            <li key={i}>
              <Link href={v.href} className="" activeClassName="">
                {v.display_name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
