import css from "./page.module.css";
import { ButtonLink } from "@/components/ButtonLink/ButtonLink";

export default function HomePage() {
  return (
    <section className={css.page}>
      <div className={css.container}>
        <h1 className={css.title}>Campers of your dreams</h1>
        <h2 className={css.subtitle}>
          You can find everything you want in our catalog
        </h2>
        <ButtonLink href="/campers" className={css.link}>
          View Now
        </ButtonLink>
      </div>
    </section>
  );
}
