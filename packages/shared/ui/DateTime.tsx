import {
  format as dateFnsFormat,
  formatDistance as dateFnsFormatDistance,
} from "date-fns";

/**
 * UI component for formatting date/time values
 */
export default function DateTime({
  dateTime,
  format = "dateTime",
}: {
  dateTime?: Date | null;
  format?: "date" | "time" | "dateTime";
}) {
  if (!dateTime) return null;

  const now = new Date();

  return (
    <time dateTime={dateTime.toISOString()}>
      {format === "dateTime" &&
        dateFnsFormat(dateTime, "dd LLL yyyy h:mm aaaa")}
      {format === "date" && dateFnsFormat(dateTime, "d LLL yyyy")}
      {format === "time" && dateFnsFormat(dateTime, "h:mm aaaa")}
    </time>
  );
}
