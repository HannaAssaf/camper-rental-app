import css from "./CamperItem.module.css";
import Image from "next/image";
import { Camper } from "@/types/campers";
import CamperMeta from "../CamperMeta/CamperMeta";
import CamperEquipment from "../CamperEquipment/CamperEquipment";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { ButtonLink } from "../ButtonLink/ButtonLink";

export default function VehicleItem({ camper }: { camper: Camper }) {
  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.imageWrapper}>
          <Image
            src={camper.gallery[0]?.original}
            alt={camper.name}
            className={css.image}
            width={292}
            height={320}
            unoptimized
          />
        </div>
        <div className={css.content}>
          <div className={css.header}>
            <h2 className={css.title}>{camper.name}</h2>
            <div className={css.headerRight}>
              <p className={css.price}>€{camper.price.toFixed(2)}</p>
              <FavoriteButton id={camper.id} />
            </div>
          </div>
          <CamperMeta
            rating={camper.rating}
            reviewsCount={camper.reviews.length}
            location={camper.location}
          />
          <p className={css.description}>{camper.description}</p>
          <CamperEquipment equipment={camper} variant="catalog" />
          <ButtonLink href={`/campers/${camper.id}`} className={css.link}>
            Show more
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
