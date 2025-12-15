import CampersList from "@/components/CampersList/CampersList";
import { getCampers } from "@/lib/api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campers | TravelTrucks",
  description:
    "Discover top-quality campers and travel trucks ready for your next adventure. Browse listings, compare models, and choose the ideal vehicle.",
};

export default async function CampersPage() {
  const campers = await getCampers();

  return (
    <section>
      <div>
        {Array.isArray(campers) && campers.length > 0 ? (
          <CampersList campers={campers} />
        ) : (
          <p>
            No campers found. Count:{" "}
            {Array.isArray(campers) ? campers.length : "not array"}
          </p>
        )}
      </div>
    </section>
  );
}
