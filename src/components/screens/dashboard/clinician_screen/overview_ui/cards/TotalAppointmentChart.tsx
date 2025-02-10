import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { appointmentSummary } from "@/services/api/clinicians/appointment";
import RadialChart from "@/components/ui/radial-chart";

const TotalAppointmentsChart = () => {
  const [totalAppointments, setTotalAppointments] = useState<number | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await appointmentSummary(
          new Date().getFullYear().toString()
        );
        setTotalAppointments(response.total_appointments || 0);
      } catch (error) {
        console.error("Failed to fetch appointments data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <Card className="flex flex-col items-center justify-center w-[372px]">
        <CardContent>Loading...</CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col items-center w-[372px]">
      <CardHeader className="items-center pb-2">
        <CardTitle>Total Appointments</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center pb-2">
        <RadialChart
          data={[
            {
              name: "Appointments",
              value: totalAppointments || 0,
              fill: "#8BA05F",
            },
          ]}
          centerValue={totalAppointments}
          width={200}
          height={200}
          innerRadius={50}
          outerRadius={110}
        />
      </CardContent>
    </Card>
  );
};

export default TotalAppointmentsChart;
