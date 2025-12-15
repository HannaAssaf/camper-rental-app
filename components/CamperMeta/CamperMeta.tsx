import css from "./CamperMeta.module.css";

interface Props {
  rating: number;
  reviewsCount: number;
  location: string;
}

export default function CamperMeta({ rating, reviewsCount, location }: Props) {
  return (
    <div className={css.meta}>
      <div className={css.metaLeft}>
        <span className={css.rating}>
          <svg className={`${css.icon} ${css.star}`} aria-hidden="true">
            <use href="/icons.svg#star-pressed" />
          </svg>
          {rating}
        </span>
        <span className={css.reviews}>
          {reviewsCount === 0
            ? "No reviews"
            : `(${reviewsCount} ${reviewsCount === 1 ? "Review" : "Reviews"})`}
        </span>
      </div>

      <span className={css.location}>
        <svg className={css.icon} aria-hidden="true">
          <use href="/icons.svg#map" />
        </svg>
        {location}
      </span>
    </div>
  );
}
