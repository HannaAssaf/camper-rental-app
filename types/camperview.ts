import {
  Camper,
  CamperEquipmentType,
  CamperDetailsProp,
} from "@/types/campers";

export type CamperView = Camper & {
  equipment: CamperEquipmentType;
  details: CamperDetailsProp;
};

export function toCamperView(c: Camper): CamperView {
  return {
    ...c,
    equipment: {
      transmission: c.transmission,
      engine: c.engine,
      AC: c.AC,
      bathroom: c.bathroom,
      kitchen: c.kitchen,
      TV: c.TV,
      radio: c.radio,
      refrigerator: c.refrigerator,
      microwave: c.microwave,
      gas: c.gas,
      water: c.water,
    },
    details: {
      form: c.form,
      length: c.length,
      width: c.width,
      height: c.height,
      tank: c.tank,
      consumption: c.consumption,
    },
  };
}

export const vehicleDetailsConfig: Record<
  keyof CamperDetailsProp,
  {
    label: string;
    capitalize?: boolean;
  }
> = {
  form: { label: "Form", capitalize: true },
  length: { label: "Length" },
  width: { label: "Width" },
  height: { label: "Height" },
  tank: { label: "Tank" },
  consumption: { label: "Consumption" },
};
