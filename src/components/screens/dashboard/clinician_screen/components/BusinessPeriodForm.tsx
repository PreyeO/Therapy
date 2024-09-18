import React from "react";
import { Switch } from "@/components/ui/switch";
import { BusinessPeriod } from "@/types/formSchema";
import TimeSelect from "./TimeSelect";

interface BusinessPeriodFormProps {
  businessPeriods: BusinessPeriod[];
  updateBusinessPeriod: (
    index: number,
    period: Partial<BusinessPeriod>
  ) => void;
  onSave: () => void;
}

const BusinessPeriodForm: React.FC<BusinessPeriodFormProps> = ({
  businessPeriods,
  updateBusinessPeriod,
  onSave,
}) => {
  return (
    <form onSubmit={onSave} className="flex flex-col gap-5">
      {/* Header Row */}
      <div className="flex items-center justify-center md:gap-20 pb-10 pt-3 md:text-base text-[9.19px] font-normal text-[#444444B2]">
        <h3 className="w-1/4 text-center"></h3>
        <h3 className="w-1/4 text-center">Open hour</h3>
        <h3 className="w-1/4 text-center">Close hour</h3>
        <h3 className="w-1/4 text-center">Action</h3>
      </div>
      {/* Data Rows */}
      {businessPeriods.map((item, index) => (
        <div
          className="flex md:gap-10 gap-5 items-center justify-center"
          key={index}
        >
          <h3 className="w-1/4 text-center md:text-base text-[9.19px] font-bold">
            {item.day_of_week}
          </h3>
          <div className="w-1/4">
            <TimeSelect
              placeholder="08:00"
              value={item.opening_hour} // Use the value from state
              onChange={(value) => {
                updateBusinessPeriod(index, { opening_hour: value });
              }}
            />
          </div>
          <div className="w-1/4">
            <TimeSelect
              placeholder="18:00"
              value={item.closing_hour} // Use the value from state
              onChange={(value) => {
                updateBusinessPeriod(index, { closing_hour: value });
              }}
            />
          </div>
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
      <button type="submit" className="mt-5">
        Save
      </button>
    </form>
  );
};

export default BusinessPeriodForm;
