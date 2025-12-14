import Link from "next/link";
import css from "./page.module.css";

export default function HomePage() {
  return (
    <div className={css.container}>
      <div>
        <h1 className={css.title}>Campers of your dreams</h1>
        <h2 className={css.subtitle}>
          You can find everything you want in our catalog
        </h2>
        <Link href="/campers" className={css.link}>
          View Now
        </Link>
      </div>
    </div>
  );
}
