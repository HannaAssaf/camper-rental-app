import { Metadata } from "next";
import CampersListClient from "./CamperListClient";
import css from "./CampersLayout.module.css";
import Filter from "@/components/Filter/Filter";

export const metadata: Metadata = {
  title: "Campers | TravelTrucks",
  description:
    "Discover top-quality campers and travel trucks ready for your next adventure. Browse listings, compare models, and choose the ideal vehicle.",
};

export default function CampersPage() {
  return (
    <section>
      <div className={css.container}>
        <aside className={css.sidebar}>
          <Filter />
        </aside>
        <div className={css.content}>
          <CampersListClient />
        </div>
      </div>
    </section>
  );
}
