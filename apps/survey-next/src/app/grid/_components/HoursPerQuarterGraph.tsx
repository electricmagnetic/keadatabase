"use client";

import { format, parseISO } from "date-fns";
import { ResponsiveContainer, BarChart, XAxis, Bar, Tooltip } from "recharts";

interface HourSet {
  quarter: string;
  with_kea: number;
  total: number;
}

interface HoursPerQuarterGraphProps {
  gridTileAnalysis: {
    hours_per_quarter: HourSet[];
  };
}

/**
 * Calculate hours without kea
 */
function calculateHoursWithoutKea(hourSet: HourSet): number {
  return hourSet.total - hourSet.with_kea;
}

/**
 * Displays a bar chart showing hours with/without kea per quarter
 */
export function HoursPerQuarterGraph({
  gridTileAnalysis,
}: HoursPerQuarterGraphProps) {
  const hoursSurveyedPerQuarter = gridTileAnalysis.hours_per_quarter.map(
    (hourSet) => ({
      ...hourSet,
      without_kea: calculateHoursWithoutKea(hourSet),
    }),
  );

  if (hoursSurveyedPerQuarter.length === 0) {
    return <div className="text-muted">No quarterly data available</div>;
  }

  const commonBarAttributes = {
    stackId: "common",
    maxBarSize: 25,
    barGap: 5,
  };

  return (
    <ResponsiveContainer width="100%" height={128}>
      <BarChart data={hoursSurveyedPerQuarter}>
        <XAxis
          dataKey="quarter"
          tickFormatter={(quarter: string) =>
            format(parseISO(quarter), "MMM-yy")
          }
        />
        <Tooltip
          labelFormatter={(quarter) =>
            quarter ? format(parseISO(quarter as string), "MMMM yyyy") : ""
          }
          formatter={(value) => (value != null ? `${value} h` : "")}
        />
        <Bar
          dataKey="without_kea"
          name="No kea"
          fill="#dfd4ba"
          {...commonBarAttributes}
        />
        <Bar
          dataKey="with_kea"
          name="Kea"
          fill="#df5206"
          {...commonBarAttributes}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
