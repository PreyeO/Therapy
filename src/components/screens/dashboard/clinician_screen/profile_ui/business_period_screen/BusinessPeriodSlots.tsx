import { useEffect } from "react";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore"; // Zustand store
import TimeSelect from "../../components/TimeSelect";
import SmallLoader from "@/components/ui/loader_effects/SmallLoader";

import { Edit, Trash2 } from "lucide-react";
import { truncateToFirstTwoWords } from "@/lib/utils";
import BusinessPeriodsHeader from "../../../components/BusinessPeriodHeader";

const BusinessPeriodSlots = () => {
  const {
    fetchedBusinessPeriods, // Use fetched periods
    loading,
    fetchBusinessPeriods,
    updateBusinessPeriod,
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
    <form>
      <div className="flex flex-col mt-6 gap-10">
        {/* Header */}

        <BusinessPeriodsHeader showActions={true} />

        <div className="flex flex-col gap-5">
          {fetchedBusinessPeriods.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              {/* Time Slot Row */}
              <div className="flex items-center justify-center gap-10">
                <h3 className="w-1/4 text-center md:text-base text-[9.19px] font-bold">
                  {item.day_of_week}
                </h3>

                <div className="w-[30%]">
                  <TimeSelect
                    placeholder={item.opening_hour || "08:00"}
                    value={item.opening_hour}
                    onChange={(value) =>
                      updateBusinessPeriod(index, { opening_hour: value })
                    }
                  />
                </div>

                <div className="w-[30%]">
                  <TimeSelect
                    placeholder={item.closing_hour || "18:00"}
                    value={item.closing_hour}
                    onChange={(value) =>
                      updateBusinessPeriod(index, { closing_hour: value })
                    }
                  />
                </div>
                <div className="w-[30%]">
                  <div className="border h-12 flex items-center justify-center rounded-xl gap-3">
                    {item.business_locations?.length ? (
                      <p className="text-[9px] md:text-[14px] text-[#041827B2] text-center">
                        {item.business_locations
                          .map((location) =>
                            truncateToFirstTwoWords(
                              `${location.location.street_address}, ${location.location.city}, ${location.location.state}, ${location.location.postal_code}`
                            )
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

                <div className="w-[15%] flex justify-center">
                  <div className="border md:w-[103px] w-[59.17px] h-12 flex items-center justify-center rounded-xl gap-3">
                    <Edit color="#8BA05F" size={20} />
                    <Trash2 color="red" size={20} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};

export default BusinessPeriodSlots;
