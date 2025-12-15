import { Camper } from "@/types/campers";
import CamperItem from "../CamperItem/CamperItem";
import css from "./CampersList.module.css";

type Props = {
  campers: Camper[];
};

export default function CampersList({ campers }: Props) {
  if (!campers || campers.length === 0) {
    return null;
  }
  return (
    <ul className={css.list}>
      {campers.map((camper) => (
        <li key={camper.id} className={css.item}>
          <CamperItem camper={camper} />
        </li>
      ))}
    </ul>
  );
}
