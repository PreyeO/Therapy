import React, { useState } from "react";
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
import { ApointmentBookingFormSchema } from "@/types/formSchema";
import { Button } from "@/components/ui/button";

type AvailableTimeProps = {
  day: Date;
  timeSlot: string;
  onContinue: () => void;
};

const AvailableTime: React.FC<AvailableTimeProps> = ({
  day,
  timeSlot,
  onContinue,
}) => {
  const form = useForm({
    resolver: zodResolver(ApointmentBookingFormSchema),
  });

  // State to track the selected service
  const [selectedService, setSelectedService] = useState<string | null>(null);

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
                    {...field}
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
                    className="text-sm font-normal w-full  cursor-not-allowed"
                    autoComplete="off"
                    {...field}
                    value={timeSlot}
                    readOnly
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* Interactive Select */}
          <div className="my-2">
            <label className="block text-sm font-medium text-gray-700">
              Select Location
            </label>
            <Select>
              <SelectTrigger className="w-full rounded-md border cursor-pointer">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="location1">Location 1</SelectItem>
                <SelectItem value="location2">Location 2</SelectItem>
                <SelectItem value="location3">Location 3</SelectItem>
                <SelectItem value="location4">Location 4</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="">
            <label className="block text-sm font-medium text-gray-700">
              Select Service
            </label>
            <Select
              onValueChange={(value) => {
                setSelectedService(value); // Update state when a service is selected
              }}
            >
              <SelectTrigger className="w-full rounded-md border cursor-pointer">
                <SelectValue placeholder="Select Service type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="service1">Service 1</SelectItem>
                <SelectItem value="service2">Service 2</SelectItem>
                <SelectItem value="service3">Service 3</SelectItem>
                <SelectItem value="service4">Service 4</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Conditionally render the rate, duration, and continue button */}
          {selectedService && (
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
                          className="text-sm font-normal w-full  cursor-not-allowed"
                          autoComplete="off"
                          {...field}
                          placeholder="58mins"
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
                          className="text-sm font-normal w-full  cursor-not-allowed"
                          autoComplete="off"
                          {...field}
                          placeholder="$132"
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
                  className="rounded-full w-[195px] cursor-pointer"
                  onClick={onContinue}
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
