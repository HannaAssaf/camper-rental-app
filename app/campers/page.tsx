import { Metadata } from "next";
import CampersListClient from "./CamperListClient";
import css from "./CampersLayout.module.css";
import Filter from "@/components/Filter/Filter";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Campers | TravelTrucks",
  description:
    "Discover top-quality campers and travel trucks ready for your next adventure. Browse listings, compare models, and choose the ideal vehicle.",
};

export default function CampersPage() {
  return (
    <section>
      <div className={css.container}>
        <Suspense fallback={<div>Loading…</div>}>
          <aside className={css.sidebar}>
            <Filter />
          </aside>
          <div className={css.content}>
            <CampersListClient />
          </div>
        </Suspense>
      </div>
    </section>
  );
}
