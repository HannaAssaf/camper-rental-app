"use client";

import { useState } from "react";
import css from "./FavoriteButton.module.css";

interface Props {
  initial?: boolean;
  id?: string;
}

export default function FavoriteButton({ initial = false }: Props) {
  const [liked, setLiked] = useState(initial);

  return (
    <button
      className={`${css.btn} ${liked ? css.liked : ""}`}
      onClick={() => setLiked((prev) => !prev)}
      aria-label={liked ? "Remove from favorites" : "Add to favorites"}
    >
      <svg className={css.icon} width="20" height="20">
        <use href="/icons.svg#favorites" />
      </svg>
    </button>
  );
}
