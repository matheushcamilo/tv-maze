import { WeekDays } from "@services";

export function formatDays(days: WeekDays[]): string {
  if (days.length === 1) {
    return days[0];
  }

  const abbreviations = {
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat",
    Sunday: "Sun",
  };

  const abbreviatedDays = days.map(day => abbreviations[day]);

  if (abbreviatedDays.length === 7) {
    return "Mon to Sun";
  }

  if (abbreviatedDays.includes("Mon") && abbreviatedDays.includes("Fri") && abbreviatedDays.length === 5) {
    return "Mon to Fri";
  }

  return abbreviatedDays.join(" - ");
}
