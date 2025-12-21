import { CamperReview } from "@/types/campers";
import css from "./CamperReviews.module.css";

type Props = {
  reviews: CamperReview[];
};

const MAX_STARS = 5;

export default function VehicleReviews({ reviews }: Props) {
  return (
    <section className={css.reviews} aria-label="Vehicle reviews">
      <ul className={css.list}>
        {reviews.map((review) => (
          <li
            key={review.reviewer_name + review.comment.slice(0, 10)}
            className={css.item}
          >
            <div className={css.avatar}>
              {review.reviewer_name.charAt(0).toUpperCase()}
            </div>
            <div className={css.header}>
              <span className={css.name}>{review.reviewer_name}</span>
              <div className={css.stars}>
                {Array.from({ length: MAX_STARS }).map((_, index) => {
                  const isFilled = index < review.reviewer_rating;

                  return (
                    <svg
                      key={index}
                      className={isFilled ? css.starFilled : css.starEmpty}
                    >
                      <use
                        href={
                          isFilled
                            ? "/icons.svg#star-pressed"
                            : "/icons.svg#star-default"
                        }
                      />
                    </svg>
                  );
                })}
              </div>
            </div>

            <p className={css.comment}>{review.comment}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
