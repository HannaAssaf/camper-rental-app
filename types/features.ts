import { IconName } from "@/components/Icon/Icon";
import { CamperEquipmentType } from "./campers";

export const equipmentConfig: Record<
  keyof CamperEquipmentType,
  { label: string; icon?: IconName }
> = {
  transmission: { label: "Transmission", icon: "transmission" },
  engine: { label: "Engine", icon: "engine" },
  AC: { label: "AC", icon: "ac" },
  bathroom: { label: "Bathroom", icon: "bathroom" },
  kitchen: { label: "Kitchen", icon: "kitchen" },
  TV: { label: "TV", icon: "tv" },
  radio: { label: "Radio", icon: "radio" },
  refrigerator: { label: "Refrigerator", icon: "refrigerator" },
  microwave: { label: "Microwave", icon: "microwave" },
  gas: { label: "Gas", icon: "gas" },
  water: { label: "Water", icon: "water" },
};
