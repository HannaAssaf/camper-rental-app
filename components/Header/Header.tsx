import Link from "next/link";
import Image from "next/image";
import css from "./Header.module.css";

export default async function Header() {
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
              <Link href="/" className={css.navLink}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/campers" className={css.navLink}>
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
