import { Metadata } from "next";
import CampersListClient from "./CamperListClient";
import css from "./CampersLayout.module.css";

export const metadata: Metadata = {
  title: "Campers | TravelTrucks",
  description:
    "Discover top-quality campers and travel trucks ready for your next adventure. Browse listings, compare models, and choose the ideal vehicle.",
};

export default function CampersPage() {
  return (
    <div className={css.content}>
      <CampersListClient />
    </div>
  );
}
