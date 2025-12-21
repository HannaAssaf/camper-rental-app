"use client";

import { useState } from "react";
import css from "./CamperDetailsSection.module.css";

import BookingForm from "../BookingForm/BookingForm";
import CampersTabsHeader, {
  type Tab,
} from "../CampersTabsHeader/CampersTabsHeader";

import type { CamperView } from "@/types/camperview";
import CampersTabs from "../CampersTab/CampersTab";

type Props = { camper: CamperView };

export default function CamperDetailsSection({ camper }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("details");

  return (
    <section
      className={css.container}
      aria-label="Vehicle features, reviews and booking"
    >
      <div className={css.headerRow}>
        <CampersTabsHeader activeTab={activeTab} onChange={setActiveTab} />
      </div>

      <div className={css.leftCol}>
        <CampersTabs camper={camper} activeTab={activeTab} />
      </div>

      <aside className={css.rightCol}>
        <BookingForm />
      </aside>
    </section>
  );
}
