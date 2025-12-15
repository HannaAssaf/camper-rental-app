import css from "./CampersLayout.module.css";

type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const CampersLayout = ({ children, sidebar }: Props) => {
  return (
    <section className={css.page}>
      <div className={css.container}>
        <aside className={css.sidebar}>{sidebar}</aside>
        <div className={css.content}>{children}</div>
      </div>
    </section>
  );
};

export default CampersLayout;
