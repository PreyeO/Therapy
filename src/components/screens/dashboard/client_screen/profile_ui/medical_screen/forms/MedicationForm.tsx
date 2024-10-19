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
import { medicationSchema } from "@/types/formSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const MedicationForm = () => {
  const form = useForm({
    resolver: zodResolver(medicationSchema),
  });

  return (
    <div className="flex flex-col gap-5 scale-95">
      <Form {...form}>
        <form className="flex flex-col gap-5">
          <div className="flex gap-5 w-full">
            <FormField
              control={form.control}
              name="medication_name"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                    Medication Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-16 text-placeholder_text font-sm font-normal w-full"
                      autoComplete="off"
                      placeholder="Enter the name of medication"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="medication_prescriber"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                    Prescriber Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-16 text-placeholder_text font-sm font-normal w-full"
                      autoComplete="off"
                      placeholder="Enter the name of medication"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-5 w-full">
            <div className="flex w-1/2 gap-2">
              <FormField
                control={form.control}
                name="medical_dosage"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                      Dosage
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-16 text-placeholder_text font-sm font-normal w-full"
                        autoComplete="off"
                        placeholder="Enter dosage"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                  </FormItem>
                )}
              />
              <FormItem className="w-[100px]">
                <FormLabel className="text-base font-medium text-primary_black_text">
                  Unit
                </FormLabel>
                <Select>
                  <SelectTrigger className="h-16 text-placeholder_text text-sm font-normal w-full rounded-xl">
                    <SelectValue placeholder="mg" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="capsule">Capsule</SelectItem>
                    <SelectItem value="tablet">Tablet</SelectItem>
                    <SelectItem value="ml">ml</SelectItem>
                    <SelectItem value="mg">mg</SelectItem>
                    <SelectItem value="g">g</SelectItem>
                    <SelectItem value="tsp">Tsp</SelectItem>
                    <SelectItem value="tbsp">Tbsp</SelectItem>
                    <SelectItem value="oral">Oral</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            </div>

            {/* Frequency field with same width as Dosage + Unit group */}
            <FormItem className="w-1/2">
              <FormLabel className="text-base font-medium text-primary_black_text">
                Frequency
              </FormLabel>
              <Select>
                <SelectTrigger className="h-16 text-placeholder_text text-sm font-normal w-full rounded-xl">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="BID">BID</SelectItem>
                  <SelectItem value="TID">TID</SelectItem>
                  <SelectItem value="QID">QID</SelectItem>
                  <SelectItem value="PRN">PRN</SelectItem>
                  <SelectItem value="once_a_week">Once a week</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          </div>

          <div className="flex gap-5 w-full">
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                    Start Date
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-16 text-placeholder_text font-sm font-normal w-full"
                      autoComplete="off"
                      placeholder="Enter start date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                    End Date
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-16 text-placeholder_text font-sm font-normal w-full"
                      autoComplete="off"
                      placeholder="Enter end date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="purpose"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                  Purpose
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-16 text-placeholder_text font-sm font-normal w-full"
                    autoComplete="off"
                    placeholder="Enter purpose"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[#E75F51] text-[13px] font-light" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                  Note
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-16 text-placeholder_text font-sm font-normal w-full"
                    autoComplete="off"
                    placeholder="Enter notes"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[#E75F51] text-[13px] font-light" />
              </FormItem>
            )}
          />
          <Button className="rounded-full h-[63px] text-xl font-medium">
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default MedicationForm;
