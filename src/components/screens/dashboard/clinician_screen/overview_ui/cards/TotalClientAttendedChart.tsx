import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { appointmentSummary } from "@/services/api/clinicians/appointment";
import RadialChart from "@/components/ui/radial-chart";

const TotalClientsAttendedChart = () => {
  const [totalClientsAttended, setTotalClientsAttended] = useState<
    number | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await appointmentSummary(
          new Date().getFullYear().toString()
        );
        setTotalClientsAttended(response.total_clients_attended || 0);
      } catch (error) {
        console.error("Failed to fetch clients attended data", error);
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
        <CardTitle>Total Clients Attended</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center pb-2">
        <RadialChart
          data={[
            {
              name: "Clients Attended",
              value: totalClientsAttended || 0,
              fill: "#3A5334",
            },
          ]}
          centerValue={totalClientsAttended}
          width={200}
          height={200}
          innerRadius={50}
          outerRadius={110}
        />
      </CardContent>
    </Card>
  );
};

export default TotalClientsAttendedChart;
