import { CamperDetailsProp } from "../../types/campers";

type Props = {
  details: CamperDetailsProp;
};

export default function VehicleDetails({ details }: Props) {
  return (
    <section>
      <h3>Vehicle details</h3>
    </section>
  );
}
