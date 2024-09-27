import Title from "@/components/ui/Titles/Title";
import { Card } from "@/components/ui/card";
import SmallLoader from "@/components/ui/loader_effects/SmallLoader";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import { useEffect } from "react";

const BusinessTime = () => {
  const {
    fetchedBusinessPeriods, // Use fetched periods
    loading,
    fetchBusinessPeriods,
  } = useBusinessPeriodsStore(); // Access state and methods from Zustand

  // Fetch the business periods on component mount
  useEffect(() => {
    fetchBusinessPeriods();
  }, [fetchBusinessPeriods]);

  if (loading) {
    return (
      <div className="relative w-full h-[300px] flex justify-center items-center">
        <SmallLoader />
      </div>
    );
  }

  if (!fetchedBusinessPeriods.length) {
    return <div>No business periods available.</div>;
  }
  return (
    <Card className="py-9 w-full rounded-lg px-[3%] pb-12">
      <div className="flex justify-between">
        <Title title="Business Hour" className="text-xl font-bold" />
      </div>

      <div className="flex flex-col gap-10">
        <div className="flex items-center justify-center pt-10 md:text-base text-[9.19px] font-normal text-[#444444B2]">
          {/* Adjusting header widths to match data row widths */}
          <h3 className="w-[30%] ">Day</h3>
          <h3 className="w-[15%] pl-1 ">Open hour</h3>
          <h3 className="w-[15%] pl-2 ">Close hour</h3>
          <h3 className="w-[40%] pl-6 ">Location</h3>
        </div>

        <div className="flex flex-col gap-5">
          {fetchedBusinessPeriods.map((item, index) => (
            <div key={index} className="flex gap-5 items-center justify-center">
              {/* Aligning data rows with the same widths */}
              <div className="w-[30%] border rounded-md p-3 ">
                {" "}
                {item.day_of_week}
              </div>
              <div className="w-[15%] border rounded-md p-3 ">
                {item.opening_hour}
              </div>
              <div className="w-[15%] border rounded-md p-3 ">
                {item.closing_hour}
              </div>
              <div className="w-[40%] border rounded-md p-3">
                <div className=" flex items-center justify-center rounded-xl gap-3">
                  {item.business_locations?.length ? (
                    <p className="text-[9px] md:text-[14px] text-[#041827B2] text-center">
                      {item.business_locations
                        .map(
                          (location) =>
                            `${location.location.street_address}, ${location.location.city}, ${location.location.state}, ${location.location.postal_code}`
                        )
                        .join("; ")}
                    </p>
                  ) : (
                    <p className="text-[9px] md:text-[12px] text-gray-500 italic">
                      No locations available
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default BusinessTime;
