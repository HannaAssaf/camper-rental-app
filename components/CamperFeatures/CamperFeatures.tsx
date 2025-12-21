"use client";

import CamperEquipment from "@/components/CamperEquipment/CamperEquipment";
import type { CamperView } from "@/types/camperview";
import VehicleDetails from "../VehicleDetails/VehicleDetails";

type Props = {
  camper: CamperView;
};

export default function CamperFeatures({ camper }: Props) {
  return (
    <div>
      <CamperEquipment equipment={camper.equipment} variant="detailed" />
      <VehicleDetails details={camper.details} />
    </div>
  );
}
