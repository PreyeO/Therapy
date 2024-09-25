import React from "react";
import { format } from "date-fns";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
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

// Define the props including 'day' and 'timeSlot'
type AvailableTimeProps = {
  day: Date;
  timeSlot: string;
};

const AvailableTime: React.FC<AvailableTimeProps> = ({ day, timeSlot }) => {
  const [open, setOpen] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(ApointmentBookingFormSchema),
  });

  // Handle the state of the popover manually
  const handleTogglePopover = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <Popover open={open} onOpenChange={handleTogglePopover}>
      <PopoverTrigger asChild>
        <div
          className="absolute inset-0 cursor-pointer flex items-center justify-center bg-gray-100 hover:bg-gray-200"
          onClick={() => handleTogglePopover(true)} // Open the popover on click
        >
          <p className="text-gray-500 text-sm">+</p>
        </div>
      </PopoverTrigger>
      <PopoverContent
        onClick={(e) => e.stopPropagation()} // Prevent closing the popover on clicking inside it
        className=""
      >
        <Form {...form}>
          <form className="flex flex-col gap-5 w-full mb-3">
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
                      className=" text-sm font-normal w-full"
                      autoComplete="off"
                      {...field}
                      readOnly
                      value={format(day, "yyyy-MM-dd")}
                    />
                  </FormControl>
                  <FormMessage className="text-[#E75F51] text-[13px] font-light" />
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
                      className=" text-sm font-normal w-full"
                      autoComplete="off"
                      {...field}
                      value={timeSlot}
                      readOnly
                    />
                  </FormControl>
                  <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                </FormItem>
              )}
            />

            <div className="my-2">
              <label className="block text-sm font-medium text-gray-700">
                Select Service
              </label>
              <Select>
                <SelectTrigger className="w-full rounded-md border">
                  <SelectValue placeholder="Choose service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="service1">Service 1</SelectItem>
                  <SelectItem value="service2">Service 2</SelectItem>
                  <SelectItem value="service3">Service 3</SelectItem>
                  <SelectItem value="service4">Service 4</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="my-2">
              <label className="block text-sm font-medium text-gray-700">
                Select Location
              </label>
              <Select>
                <SelectTrigger className="w-full rounded-md border">
                  <SelectValue placeholder="Choose location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="location1">Location 1</SelectItem>
                  <SelectItem value="location2">Location 2</SelectItem>
                  <SelectItem value="location3">Location 3</SelectItem>
                  <SelectItem value="location4">Location 4</SelectItem>
                </SelectContent>
              </Select>
            </div>

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
                        className=" text-sm font-normal w-full"
                        autoComplete="off"
                        {...field}
                        placeholder="58mins"
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
                        className=" text-sm font-normal w-full"
                        autoComplete="off"
                        {...field}
                        placeholder="$132"
                      />
                    </FormControl>
                    <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end ">
              <Button
                className="rounded-full w-[195px]"
                onClick={() => handleTogglePopover(false)} // Close the popover on Continue click
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};

export default AvailableTime;
