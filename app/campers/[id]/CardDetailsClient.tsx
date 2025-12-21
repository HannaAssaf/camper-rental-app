"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getCamperById } from "@/lib/api";
import CamperMeta from "@/components/CamperMeta/CamperMeta";
import css from "./CardDetailsClient.module.css";
import CamperDetailsSection from "@/components/CamperDetailsSection/CamperDetailsSection";
import { toCamperView } from "@/types/camperview";
import type { CamperView } from "@/types/camperview";
import { Camper } from "@/types/campers";

type Props = {
  id: string;
};

export default function CardDetailsClient({ id }: Props) {
  const {
    data: camperView,
    isLoading,
    isError,
  } = useQuery<Camper, Error, CamperView>({
    queryKey: ["vehicle", id],
    queryFn: () => getCamperById(id),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    select: toCamperView,
  });

  if (isLoading) return <div className={css.page}>Loading...</div>;
  if (isError || !camperView)
    return <div className={css.page}>Failed to load</div>;

  return (
    <div className={css.container}>
      <section className={css.metaSection} aria-label="Camper descriptions">
        <h2 className={css.title}>{camperView.name}</h2>
        <CamperMeta
          rating={camperView.rating}
          reviewsCount={camperView.reviews.length}
          location={camperView.location}
        />
        <p className={css.price}>€{camperView.price.toFixed(2)}</p>
        <div className={css.gallery}>
          {camperView.gallery.slice(0, 4).map((img, index) => (
            <div className={css.imageWrapper} key={index}>
              <Image
                src={img.original}
                alt={`${camperView.name} photo ${index + 1}`}
                className={css.image}
                width={292}
                height={312}
                unoptimized
              />
            </div>
          ))}
        </div>
        <p className={css.description}>{camperView.description}</p>
      </section>
      <CamperDetailsSection camper={camperView} />
    </div>
  );
}
