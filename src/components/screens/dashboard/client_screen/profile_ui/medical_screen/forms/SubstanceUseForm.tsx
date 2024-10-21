import { Form, FormItem, FormLabel } from "@/components/ui/form";
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

const SubstanceUseForm = () => {
  const form = useForm({
    resolver: zodResolver(medicationSchema),
  });

  return (
    <div className="flex flex-col gap-5 scale-95">
      <Form {...form}>
        <form className="flex flex-col gap-5">
          <FormItem className="">
            <FormLabel className="text-base font-medium text-primary_black_text">
              Type of Substance
            </FormLabel>
            <Select>
              <SelectTrigger className="h-16 text-placeholder_text text-sm font-normal w-full rounded-xl">
                <SelectValue placeholder="Select Type of substance " />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Alcohol</SelectItem>
                <SelectItem value="BID">Tobacco</SelectItem>
                <SelectItem value="TID">Cannabis</SelectItem>
                <SelectItem value="QID">Opioids</SelectItem>
                <SelectItem value="PRN">Cocaine</SelectItem>
                <SelectItem value="once_a_week">Amphetamines</SelectItem>
                <SelectItem value="once_a_week">Hallucinogen</SelectItem>
                <SelectItem value="once_a_week">Other</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
          <FormItem className="">
            <FormLabel className="text-base font-medium text-primary_black_text">
              Frequency
            </FormLabel>
            <Select>
              <SelectTrigger className="h-16 text-placeholder_text text-sm font-normal w-full rounded-xl">
                <SelectValue placeholder="Select frequency of substance usage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Everyday</SelectItem>
                <SelectItem value="BID">every other day</SelectItem>
                <SelectItem value="TID">twice a week,</SelectItem>
                <SelectItem value="QID">Opioids</SelectItem>
                <SelectItem value="PRN">once a week</SelectItem>
                <SelectItem value="once_a_week">Other</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>

          <Button className="rounded-full h-[63px] text-xl font-medium mt-[10px]">
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default SubstanceUseForm;
