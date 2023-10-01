import { Days } from "@services";

export const VALID_DAYS: Days[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function formatDays(days: Days[]): string {
  // Validation to ensure all days are valid
  for (const day of days) {
    if (!VALID_DAYS.includes(day)) {
      throw new Error(`Invalid day: ${day}`);
    }
  }

  if (days.length === 1) {
    return days[0];
  }

  const abbreviatedDays = days.map(day => day.slice(0, 3));

  if (abbreviatedDays.length === 7) {
    return "Mon to Sun";
  }

  if (abbreviatedDays.includes("Mon") && abbreviatedDays.includes("Fri") && abbreviatedDays.length === 5) {
    return "Mon to Fri";
  }

  return abbreviatedDays.join(" - ");
}
