'use client'
import { formatISO9075, parseISO, addDays, differenceInDays } from "date-fns";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Chart({ data = [] }) {
  // If no data, show empty chart gracefully
  if (!data || data.length === 0) {
    return (
      <div className="text-gray-500 text-center p-4">
        No analytics data available
      </div>
    );
  }

  // Pick the y-axis label key (e.g. "views" or "clicks")
  const xLabelKey = Object.keys(data[0]).find((key) => key !== "date");

  // Fill missing days with zero values
  const dataWithoutGaps = [];
  data.forEach((value, index) => {
    const date = value.date;
    dataWithoutGaps.push({
      date,
      [xLabelKey]: value?.[xLabelKey] || 0,
    });

    const nextDate = data?.[index + 1]?.date;
    if (date && nextDate) {
      const daysBetween = differenceInDays(
        parseISO(nextDate),
        parseISO(date)
      );
      if (daysBetween > 1) {
        for (let i = 1; i < daysBetween; i++) {
          const dateBetween = formatISO9075(
            addDays(parseISO(date), i)
          ).split(" ")[0];
          dataWithoutGaps.push({
            date: dateBetween,
            [xLabelKey]: 0,
          });
        }
      }
    }
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={dataWithoutGaps}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid horizontal={false} stroke="#f5f5f5" strokeWidth="2" />
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tickMargin={10}
          tick={{ fill: "#aaa" }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickMargin={10}
          tick={{ fill: "#aaa" }}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey={xLabelKey}
          stroke="#09f"
          strokeWidth="2"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
