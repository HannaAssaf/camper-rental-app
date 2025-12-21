import css from "./CampersLayout.module.css";

type Props = {
  children: React.ReactNode;
};

const CampersLayout = ({ children }: Props) => {
  return (
    <section className={css.page}>
      <div >
        <div className={css.content}>{children}</div>
      </div>
    </section>
  );
};

export default CampersLayout;
