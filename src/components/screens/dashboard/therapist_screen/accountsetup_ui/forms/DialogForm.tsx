import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  appointmentAddressSchema,
  AppointmentAddress,
} from "@/types/formSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import OverlayHeading from "../../components/OverlayHeading";

interface DialogFormProps {
  onClick?: () => void;
  addAppointmentAddress: (address: AppointmentAddress) => void;
  closeOverlay: () => void;
}

const DialogForm: FC<DialogFormProps> = ({
  addAppointmentAddress,
  closeOverlay,
}) => {
  const form = useForm<AppointmentAddress>({
    resolver: zodResolver(appointmentAddressSchema),
  });

  const onSubmit = (data: AppointmentAddress) => {
    console.log("Submitting address data from DialogForm:", data);
    addAppointmentAddress(data);
    closeOverlay();
  };

  return (
    <div className="flex flex-col gap-20 w-full">
      <Form {...form}>
        <form
          className="flex flex-col gap-5"
          onSubmit={form.handleSubmit(onSubmit)}
          onClick={(e) => e.stopPropagation()} // Prevent closing on click inside
        >
          <OverlayHeading
            title="Add Location"
            label="Save"
            onClick={form.handleSubmit(onSubmit)}
          />
          <div className="flex gap-6 mt-4 flex-wrap">
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                    State
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-16 text-placeholder_text font-sm font-normal w-full"
                      autoComplete="off"
                      placeholder="Enter your location state"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                </FormItem>
              )}
            />
            <div className="flex gap-2 items-center w-full lg:w-auto flex-grow">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                      City
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-16 text-placeholder_text font-sm font-normal w-full"
                        autoComplete="off"
                        placeholder="Enter your location address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="street_address"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                  Street
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-16 text-placeholder_text font-sm font-normal w-full"
                    autoComplete="off"
                    placeholder="Enter your location street"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[#E75F51] text-[13px] font-light" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postal_code"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                  Zipcode
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-16 text-placeholder_text font-sm font-normal w-full"
                    autoComplete="off"
                    placeholder="Enter your location zipcode"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[#E75F51] text-[13px] font-light" />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default DialogForm;
