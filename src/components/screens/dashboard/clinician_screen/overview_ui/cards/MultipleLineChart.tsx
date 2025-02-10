import { useEffect, useState } from "react";

import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import ChartDataGroup from "./ChartDataGroup";
import YearNavigator from "@/components/common/YearNavigator";
import { appointmentSummary } from "@/services/api/clinicians/appointment";
import { AppointmentApiResponse, AppointmentSummary } from "@/types/formSchema";

const MultipleLineChart = () => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [chartData, setChartData] = useState<AppointmentSummary[]>([]);

  const transformApiResponseToChartData = (
    apiResponse: AppointmentApiResponse
  ): AppointmentSummary[] => {
    if (!apiResponse || !apiResponse.summary) return [];

    return apiResponse.summary.map((item: AppointmentSummary) => ({
      month: item.month,
      attended: item.attended,
      missed: item.missed,
      canceled: item.canceled,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AppointmentApiResponse = await appointmentSummary(
          String(currentYear)
        );
        const formattedData = transformApiResponseToChartData(response);
        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching appointment summary:", error);
      }
    };

    fetchData();
  }, [currentYear]);

  const chartConfig = {
    attended: { label: "Attended", color: "#FF2626" },
    missed: { label: "Missed", color: "#6D7C43" },
    canceled: { label: "Canceled", color: "#E5E9F2" },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          Appointments
          <YearNavigator
            currentYear={currentYear}
            setCurrentYear={setCurrentYear}
          />
        </CardTitle>
        <CardDescription className="[221px]">
          <div className="flex gap-[30px]">
            <ChartDataGroup title="Attended" className="bg-[#6D7C43]" />
            <ChartDataGroup
              title="Missed"
              className="bg-[#0418271A] opacity-10"
            />
            <ChartDataGroup title="Canceled" className="bg-[#FF2626]" />
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ left: 40, right: 12 }}>
              <YAxis
                tickCount={6}
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
                axisLine={false}
                tickLine={false}
                width={40}
              />
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                dataKey="attended"
                type="monotone"
                stroke="var(--color-attended)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="missed"
                type="monotone"
                stroke="var(--color-missed)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="canceled"
                type="monotone"
                stroke="var(--color-canceled)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default MultipleLineChart;
