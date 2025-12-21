import { CamperDetailsProp } from "@/types/campers";
import { vehicleDetailsConfig } from "../../types/camperview";
import css from "./VehicleDetails.module.css";

type Props = {
  details: CamperDetailsProp;
};

function formatForm(value: string) {
  const spaced = value.replace(/([a-z])([A-Z])/g, "$1 $2");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase();
}

function formatNumberUnit(value: string) {
  if (/\d\s+[^\s]/.test(value)) return value;

  const m = value.trim().match(/^(\d+(?:[.,]\d+)?)([a-zA-Z].*)$/);
  if (!m) return value.trim();

  const num = m[1].replace(",", ".");
  const unit = m[2];
  return `${num} ${unit}`;
}

function formatDetailValue(key: keyof CamperDetailsProp, rawValue: string) {
  if (!rawValue) return "";

  const cfg = vehicleDetailsConfig[key];
  const trimmed = rawValue.trim();

  if (key === "consumption") {
    return trimmed.replace(",", ".");
  }

  if (key === "form") {
    return formatForm(trimmed);
  }

  let formatted = formatNumberUnit(trimmed);

  if (cfg.capitalize) {
    formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }

  return formatted;
}

export default function VehicleDetails({ details }: Props) {
  return (
    <section aria-labelledby="vehicle-details-title" className={css.card}>
      <h3 id="vehicle-details-title" className={css.title}>
        Vehicle details
      </h3>

      <hr className={css.divider} />

      <dl className={css.list}>
        {Object.entries(vehicleDetailsConfig).map(([key, cfg]) => {
          const k = key as keyof CamperDetailsProp;
          const rawValue = details[k];

          return (
            <div key={key} className={css.row}>
              <dt className={css.term}>{cfg.label}</dt>
              <dd className={css.value}>{formatDetailValue(k, rawValue)}</dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
