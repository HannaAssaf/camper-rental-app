"use client";

import Link from "next/link";
import Image from "next/image";
import css from "./Header.module.css";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isCatalog = pathname === "/campers";

  return (
    <header className={css.header}>
      <div className={css.container}>
        <nav className={css.nav}>
          <Link href="/" aria-label="Campers Logo">
            <Image
              src="/images/logo.svg"
              alt="Campers Logo"
              width={136}
              height={16}
              priority
            />
          </Link>
          <ul className={css.navList}>
            <li>
              <Link
                href="/"
                className={`${css.navLink} ${isHome ? css.active : ""}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/campers"
                className={`${css.navLink} ${isCatalog ? css.active : ""}`}
              >
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
