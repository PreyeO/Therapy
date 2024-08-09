import { useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { useBusinessPeriods } from "@/hooks/useBusinessPeriods";
import { getTherapistBusinessPeriods } from "@/services/api/therapist/account_setup";
import TimeSelect from "../../components/TimeSelect";

const BusinessPeriodSlots = () => {
  const { businessPeriods, updateBusinessPeriod, setBusinessPeriods } =
    useBusinessPeriods();

  useEffect(() => {
    const fetchBusinessPeriods = async () => {
      const periods = await getTherapistBusinessPeriods();
      setBusinessPeriods(periods); // Only set the periods that exist
    };

    fetchBusinessPeriods();
  }, [setBusinessPeriods]);

  return (
    <form className="flex flex-col gap-5 mt-6">
      <div className="flex items-center justify-center md:gap-20 pb-10 pt-3 md:text-base text-[9.19px] font-normal text-[#444444B2]">
        <h3 className="w-1/4 text-center"></h3>
        <h3 className="w-1/4 text-center">Open hour</h3>
        <h3 className="w-1/4 text-center">Close hour</h3>
        <h3 className="w-1/4 text-center">Action</h3>
      </div>
      <div className="flex flex-col gap-5">
        {businessPeriods.map((item, index) => (
          <div key={index} className="flex items-center justify-around">
            {/* Ensure consistent width for day_of_week */}
            <h3 className="w-1/4 text-center md:text-base text-[9.19px] font-bold">
              {item.day_of_week}
            </h3>

            {/* Ensure consistent width for TimeSelect components */}
            <div className="w-1/4">
              <TimeSelect
                placeholder={item.opening_hour || "08:00"}
                value={item.opening_hour}
                onChange={(value) =>
                  updateBusinessPeriod(index, { opening_hour: value })
                }
              />
            </div>
            <div className="w-1/4">
              <TimeSelect
                placeholder={item.closing_hour || "18:00"}
                value={item.closing_hour}
                onChange={(value) =>
                  updateBusinessPeriod(index, { closing_hour: value })
                }
              />
            </div>

            {/* Ensure consistent width for Switch component */}
            <div className="w-1/4 flex justify-center">
              <div className="border md:w-[103px] w-[59.17px] h-[56px] flex items-center justify-center rounded-xl">
                <Switch
                  checked={!!item.opening_hour && !!item.closing_hour}
                  onChange={(checked) =>
                    updateBusinessPeriod(index, {
                      opening_hour: checked ? item.opening_hour || "09:00" : "",
                      closing_hour: checked ? item.closing_hour || "17:00" : "",
                    })
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </form>
  );
};

export default BusinessPeriodSlots;
