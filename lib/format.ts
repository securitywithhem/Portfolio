const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** Format an ISO date (YYYY-MM or YYYY-MM-DD) as e.g. "Nov 2024". */
export function formatMonthYear(iso: string): string {
  const [year, month] = iso.split("-");
  const idx = Number(month) - 1;
  const label = MONTHS[idx];
  return label ? `${label} ${year}` : (year ?? iso);
}
