import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApointmentBookingFormSchema, BookingData } from "@/types/formSchema";
import { Button } from "@/components/ui/button";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";

type AvailableTimeProps = {
  day: Date;
  timeSlot: string;
  onContinue: (data: BookingData) => void; // Pass BookingData to parent component
};

const AvailableTime: React.FC<AvailableTimeProps> = ({
  day,
  timeSlot,
  onContinue,
}) => {
  const form = useForm({
    resolver: zodResolver(ApointmentBookingFormSchema),
  });

  const {
    appointmentAddresses,
    fetchAppointmentAddresses,
    fetchServices,
    services,
  } = useBusinessPeriodsStore();

  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [serviceDetails, setServiceDetails] = useState<{
    duration: number;
    rate: number;
  } | null>(null);

  useEffect(() => {
    fetchAppointmentAddresses();
    fetchServices();
  }, [fetchAppointmentAddresses, fetchServices]);

  const handleServiceSelection = (value: string) => {
    setSelectedService(value);
    const selectedServiceDetails = services.find(
      (service) => service.id === value
    );
    if (selectedServiceDetails) {
      setServiceDetails({
        duration: selectedServiceDetails.duration,
        rate: selectedServiceDetails.price,
      });
    } else {
      setServiceDetails(null);
    }
  };

  const handleContinue = () => {
    const formData: BookingData = {
      date: format(day, "yyyy-MM-dd"),
      time: timeSlot,
      location: selectedLocation
        ? appointmentAddresses.find(
            (loc) => loc.id.toString() === selectedLocation
          )?.street_address || null
        : null,
      service: selectedService
        ? services.find((service) => service.id === selectedService)?.name ||
          null
        : null,
      duration: serviceDetails ? `${serviceDetails.duration} mins` : null,
      rate: serviceDetails ? `$${serviceDetails.rate}` : null,
    };
    onContinue(formData);
  };

  return (
    <div className="w-[394px] ">
      <Form {...form}>
        <form className="flex flex-col gap-5 w-full ">
          {/* Date and Time Fields */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel className="text-base font-medium text-primary_black_text">
                  Date
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-sm font-normal w-full cursor-not-allowed"
                    autoComplete="off"
                    {...field} // Use field in Input
                    readOnly
                    value={format(day, "yyyy-MM-dd")}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel className="text-base font-medium text-primary_black_text">
                  Time
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-sm font-normal w-full cursor-not-allowed"
                    autoComplete="off"
                    {...field} // Use field in Input
                    value={timeSlot}
                    readOnly
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* Location Select Component */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700">
                  Select location
                </FormLabel>
                <Select
                  value={selectedLocation || ""}
                  onValueChange={(value) => {
                    setSelectedLocation(value);
                    field.onChange(value); // Call field.onChange when value changes
                  }}
                >
                  <SelectTrigger className="w-full rounded-md border cursor-pointer">
                    <SelectValue placeholder="Choose location" />
                  </SelectTrigger>
                  <SelectContent>
                    {appointmentAddresses.map((location) => (
                      <SelectItem
                        key={location.id}
                        value={location.id.toString()}
                      >
                        {`${location.street_address}, ${location.city}, ${location.state}, ${location.postal_code}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-[#E75F51] text-[13px] font-light" />
              </FormItem>
            )}
          />
          {/* Service Select Component */}
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700">
                  Select service
                </FormLabel>
                <Select
                  value={selectedService || ""}
                  onValueChange={(value) => {
                    handleServiceSelection(value);
                    field.onChange(value); // Call field.onChange when value changes
                  }}
                >
                  <SelectTrigger className="w-full rounded-md border cursor-pointer">
                    <SelectValue placeholder="Choose service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-[#E75F51] text-[13px] font-light" />
              </FormItem>
            )}
          />
          {/* Conditionally render the rate, duration, and continue button */}
          {serviceDetails && (
            <>
              <div className="flex w-full gap-2">
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormLabel className="text-base font-medium text-primary_black_text">
                        Duration
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-sm font-normal w-full cursor-not-allowed"
                          autoComplete="off"
                          {...field} // Attach field to the input
                          value={`${serviceDetails.duration} mins`}
                          readOnly
                        />
                      </FormControl>
                      <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rate"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormLabel className="text-base font-medium text-primary_black_text">
                        Rate
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-sm font-normal w-full cursor-not-allowed"
                          autoComplete="off"
                          {...field} // Attach field to the input
                          value={`$${serviceDetails.rate}`}
                          readOnly
                        />
                      </FormControl>
                      <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="button"
                  className="rounded-full w-[195px] cursor-pointer"
                  onClick={handleContinue}
                >
                  Continue
                </Button>
              </div>
            </>
          )}
        </form>
      </Form>
    </div>
  );
};

export default AvailableTime;
