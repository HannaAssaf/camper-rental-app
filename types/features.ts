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

export const vehicleTypes = [
  { value: "panelTruck", label: "Van", icon: "van" },
  {
    value: "fullyIntegrated",
    label: "Fully Integrated",
    icon: "fully-integrated",
  },
  { value: "alcove", label: "Alcove", icon: "alcove" },
] as const;

export type VehicleTypeValue = (typeof vehicleTypes)[number]["value"];

export type EquipmentKey = "AC" | "kitchen" | "bathroom" | "TV" | "automatic";

export const equipmentOptions: Array<{
  key: EquipmentKey;
  label: string;
  icon: IconName;
}> = [
  { key: "AC", label: "AC", icon: "ac" },
  { key: "automatic", label: "Automatic", icon: "transmission" },
  { key: "kitchen", label: "Kitchen", icon: "kitchen" },
  { key: "TV", label: "TV", icon: "tv" },
  { key: "bathroom", label: "Bathroom", icon: "bathroom" },
];
