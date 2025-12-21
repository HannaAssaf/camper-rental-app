"use client";

import css from "./CampersTabsHeader.module.css";

export type Tab = "details" | "reviews";

type Props = {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
};

export default function CampersTabsHeader({ activeTab, onChange }: Props) {
  return (
    <nav className={css.tabsNav} aria-label="Camper details tabs">
      <button
        type="button"
        className={`${css.tab} ${activeTab === "details" ? css.tabActive : ""}`}
        onClick={() => onChange("details")}
      >
        Features
      </button>

      <button
        type="button"
        className={`${css.tab} ${activeTab === "reviews" ? css.tabActive : ""}`}
        onClick={() => onChange("reviews")}
      >
        Reviews
      </button>
    </nav>
  );
}
