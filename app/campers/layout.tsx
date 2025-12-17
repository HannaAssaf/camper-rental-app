import Filter from "@/components/Filter/Filter";
import css from "./CampersLayout.module.css";

type Props = {
  children: React.ReactNode;
};

const CampersLayout = ({ children }: Props) => {
  return (
    <section className={css.page}>
      <div className={css.container}>
        <aside className={css.sidebar}>
          <Filter />
        </aside>
        <div className={css.content}>{children}</div>
      </div>
    </section>
  );
};

export default CampersLayout;
