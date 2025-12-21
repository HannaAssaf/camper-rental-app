"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getCamperById } from "@/lib/api";
import type { Camper } from "@/types/campers";
import CamperMeta from "@/components/CamperMeta/CamperMeta";
import css from "./CardDetailsClient.module.css";
import CamperDetailsSection from "@/components/CamperDetailsSection/CamperDetailsSection";

export default function CardDetailsClient() {
  const { id } = useParams<{ id: string }>();
  const {
    data: vehicle,
    isLoading,
    isError,
  } = useQuery<Camper>({
    queryKey: ["vehicle", id],
    queryFn: () => getCamperById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <div className={css.page}>Loading...</div>;
  }

  if (isError || !vehicle) {
    return <div className={css.page}>Failed to load </div>;
  }

  return (
    <div className={css.container}>
      <section className={css.metaSection} aria-label="Camper descriptions">
        <h2 className={css.title}>{vehicle.name}</h2>
        <CamperMeta
          rating={vehicle.rating}
          reviewsCount={vehicle.reviews.length}
          location={vehicle.location}
        />
        <p className={css.price}>€{vehicle.price.toFixed(2)}</p>
        <div className={css.gallery}>
          {vehicle.gallery.slice(0, 4).map((img, index) => (
            <div className={css.imageWrapper} key={index}>
              <Image
                src={img.original}
                alt={`${vehicle.name} photo ${index + 1}`}
                className={css.image}
                width={292}
                height={312}
                unoptimized
                style={{ borderRadius: "12px", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
        <p className={css.description}>{vehicle.description}</p>
      </section>
      <CamperDetailsSection />
    </div>
  );
}
