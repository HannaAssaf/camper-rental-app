"use client";

import { useFavoritesStore } from "@/store/useFavoritesStore";
import css from "./FavoriteButton.module.css";

interface Props {
  initial?: boolean;
  id: string;
}

export default function FavoriteButton({ id, initial = false }: Props) {
  const isFavorite = useFavoritesStore((s) => s.ids.includes(id));
  const toggle = useFavoritesStore((s) => s.toggle);

  const liked = isFavorite ?? initial;
  return (
    <button
      type="button"
      className={`${css.btn} ${liked ? css.liked : ""}`}
      onClick={() => toggle(id)}
      aria-label={liked ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={liked}
    >
      <svg className={css.icon} width="20" height="20">
        <use href="/icons.svg#favorites" />
      </svg>
    </button>
  );
}
