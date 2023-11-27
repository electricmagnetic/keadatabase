import { DateTime as LuxonDateTime } from "luxon";

export default function DateTime({
  datetime,
  relative,
}: {
  datetime?: string | null;
  relative?: boolean;
}) {
  if (!datetime) return null;

  return relative
    ? LuxonDateTime.fromISO(datetime).toRelative()
    : LuxonDateTime.fromISO(datetime).toLocaleString(
        LuxonDateTime.DATETIME_MED,
        {
          locale: process.env.NEXT_PUBLIC_LOCALE,
        },
      );
}
