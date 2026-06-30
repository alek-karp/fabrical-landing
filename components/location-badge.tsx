import { Badge } from "@/components/ui/badge";

const canadaRegions = new Set([
  "AB",
  "BC",
  "MB",
  "NB",
  "NL",
  "NS",
  "NT",
  "NU",
  "ON",
  "PE",
  "QC",
  "SK",
  "YT",
]);

const getCountry = (location: string) => {
  const parts = location
    .split(",")
    .map((part) => part.trim().toUpperCase())
    .filter(Boolean);
  const region = parts.at(-1) ?? "";
  const previousRegion = parts.at(-2) ?? "";

  if (
    region === "CANADA" ||
    canadaRegions.has(region) ||
    (region === "CA" && canadaRegions.has(previousRegion))
  ) {
    return { flag: "🇨🇦", label: "Canada" };
  }

  if (["MEXICO", "MX"].includes(region)) {
    return { flag: "🇲🇽", label: "Mexico" };
  }

  return { flag: "🇺🇸", label: "United States" };
};

type LocationBadgeProps = {
  location: string;
};

export const LocationBadge = ({ location }: LocationBadgeProps) => {
  const country = getCountry(location);

  return (
    <Badge
      className="max-w-full"
      title={`${location}, ${country.label}`}
      variant="outline"
    >
      <span aria-hidden="true">{country.flag}</span>
      <span className="truncate">{location}</span>
      <span className="sr-only">{country.label}</span>
    </Badge>
  );
};
