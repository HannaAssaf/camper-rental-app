"use client";

import CamperReviews from "@/components/CamperReviews/CamperReviews";
import css from "./CampersTab.module.css";
import CamperFeatures from "../CamperFeatures/CamperFeatures";
import { CamperView } from "@/types/camperview";

import type { Tab } from "../CampersTabsHeader/CampersTabsHeader";

type Props = {
  camper: CamperView;
  activeTab: Tab;
};

export default function CampersTabsContent({ camper, activeTab }: Props) {
  return activeTab === "details" ? (
    <div className={css.detailsCard}>
      <CamperFeatures camper={camper} />
    </div>
  ) : (
    <CamperReviews reviews={camper.reviews} />
  );
}
