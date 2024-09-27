import { Card } from "@/components/ui/card";
import SmallLoader from "@/components/ui/loader_effects/SmallLoader";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import { useEffect } from "react";

const ServiceSlots = () => {
  const { services, loading, fetchServices, error } = useBusinessPeriodsStore();

  useEffect(() => {
    fetchServices(); // Fetch services when the component mounts
  }, [fetchServices]);

  if (loading) {
    return (
      <div className="relative w-full h-[300px] flex justify-center items-center">
        <SmallLoader />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <Card className="py-9 w-full rounded-lg px-[2%] pb-12">
      <div className="flex flex-col gap-10">
        {/* Headers with consistent width */}
        <div className="flex items-center justify-center gap-5 pt-10 md:text-base text-[9.19px] <p>font-bold text-[#041827]</p>">
          <h3 className="w-[40%] text-center">Services</h3>
          <h3 className="w-[20%] text-center">Duration</h3>
          <h3 className="w-[20%] text-center">Code</h3>
          <h3 className="w-[20%] text-center">Rate</h3>
        </div>

        {/* Service information */}
        <div className="flex flex-col gap-5">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex gap-5 items-center justify-center"
            >
              {/* Data rows aligned with header widths */}
              <div className="w-[40%] border rounded-md p-3 text-center">
                {service.name}
              </div>
              <div className="w-[20%] border rounded-md p-3 text-center">
                {service.duration} mins
              </div>
              <div className="w-[20%] border rounded-md p-3 text-center">
                {service.code}
              </div>
              <div className="w-[20%] border rounded-md p-3 text-center">
                ${service.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ServiceSlots;
