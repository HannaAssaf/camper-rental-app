export type IconName =
  | "transmission"
  | "engine"
  | "ac"
  | "bathroom"
  | "kitchen"
  | "tv"
  | "radio"
  | "refrigerator"
  | "microwave"
  | "gas"
  | "water"
  | "van"
  | "fully-integrated"
  | "alcove"
  | "calendar-nav-left"
  | "calendar-nav-right";

interface IconProps {
  name: IconName;
  className?: string;
  width?: number;
  height?: number;
}

export default function Icon({
  name,
  className,
  width = 20,
  height = 20,
}: IconProps) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      style={{ display: "block" }}
    >
      <use href={`/icons.svg#${name}`} />
    </svg>
  );
}
