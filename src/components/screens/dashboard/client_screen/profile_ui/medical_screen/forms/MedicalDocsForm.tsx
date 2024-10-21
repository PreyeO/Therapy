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
import { Upload } from "lucide-react";

const MedicalDocForm = () => {
  const form = useForm({
    resolver: zodResolver(medicationSchema),
  });

  return (
    <div className="flex flex-col gap-5 scale-95">
      <Form {...form}>
        <form className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="document"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
                  Upload Document
                </FormLabel>
                <FormControl className="flex flex-col items-center justify-center h-[196px] max-w-[769px]">
                  <label className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-army_green rounded-lg cursor-pointer hover:border-primary_hover">
                    <div className="flex flex-col items-center gap-[20.49px] w-[400px]">
                      <Upload className="" color="#6D7C43 " size={34.15} />
                      <p className="text-sm font-normal leading-[24.1px] text-[#BDBDBD] text-center">
                        <span className="text-army_green">Click here </span> to
                        upload your file or drag and drop, you can upload
                        multiple documents
                      </p>

                      <p className="text-[#F93939] font-light text-[11.47px]">
                        (only .png, .jpg, .jpeg & .pdf are allowed)
                      </p>
                    </div>
                    <input
                      type="file"
                      accept=".pdf, .doc, .docx, .txt"
                      multiple
                      className="hidden"
                      {...field}
                    />
                  </label>
                </FormControl>
                <FormMessage className="text-[#E75F51] text-[13px] font-light" />
              </FormItem>
            )}
          />

          <Button className="rounded-full h-[63px] text-xl font-medium mt-[66.17px]">
            Upload document
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default MedicalDocForm;
