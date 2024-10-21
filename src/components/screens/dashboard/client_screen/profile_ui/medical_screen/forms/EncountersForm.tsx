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

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const EncountersForm = () => {
  const form = useForm({
    resolver: zodResolver(medicationSchema),
  });

  return (
    <div className="flex flex-col gap-5 scale-95">
      <Form {...form}>
        <form className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="medication_name"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                  Clinician Name
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-16 text-placeholder_text font-sm font-normal w-full"
                    autoComplete="off"
                    placeholder="Enter the clinician name"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[#E75F51] text-[13px] font-light" />
              </FormItem>
            )}
          />
          <div className="flex gap-5 w-full">
            <FormField
              control={form.control}
              name="medication_prescriber"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                    Date of encounter
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-16 text-placeholder_text font-sm font-normal w-full"
                      autoComplete="off"
                      placeholder="Enter the name of medication"
                      type="date"
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
                    Time of encounter
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-16 text-placeholder_text font-sm font-normal w-full"
                      autoComplete="off"
                      placeholder="Enter the name of medication"
                      type="time"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                </FormItem>
              )}
            />
          </div>
          <FormItem className="">
            <FormLabel className="text-base font-medium text-primary_black_text">
              Meeting Type
            </FormLabel>
            <Select>
              <SelectTrigger className="h-16 text-placeholder_text text-sm font-normal w-full rounded-xl">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily"> Annual Visit</SelectItem>
                <SelectItem value="BID">Physical Exam</SelectItem>
                <SelectItem value="TID">Specialist Appointment</SelectItem>
                <SelectItem value="QID">Wellness Visit</SelectItem>
                <SelectItem value="PRN">Follow-up Appointment</SelectItem>
                <SelectItem value="once_a_week">Urgent Care Visit</SelectItem>
                <SelectItem value="once_a_week">
                  Diagnostic/Assessment Visit
                </SelectItem>
                <SelectItem value="once_a_week">
                  Chronic Disease Management
                </SelectItem>
                <SelectItem value="once_a_week">Intake Visit</SelectItem>
                <SelectItem value="once_a_week">Other</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                  Progress Note
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="h-16 text-placeholder_text font-sm font-normal w-full bg-white"
                    autoComplete="off"
                    placeholder="Enter a brief summary of what happened during the encounter"
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
                  <Textarea
                    className="h-16 text-placeholder_text font-sm font-normal w-full bg-white"
                    autoComplete="off"
                    placeholder="Enter any additional notes"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[#E75F51] text-[13px] font-light" />
              </FormItem>
            )}
          />
          <Button className="rounded-full h-[63px] text-xl font-medium ">
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default EncountersForm;
