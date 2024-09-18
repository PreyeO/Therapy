import { FC, useState } from "react";
import { handleNextPropsTwo, resetPasswordSchema } from "@/types/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { searchUserEmail } from "@/services/api/authentication/password_reset";
import { toast } from "sonner";
import ButtonLoader from "@/components/ui/loader_effects/ButtonLoader";

export const ResetForm: FC<handleNextPropsTwo> = ({ handleNext }) => {
  const schema = resetPasswordSchema.pick({ email: true });
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: z.infer<typeof schema>) {
    setLoading(true);
    try {
      const response = await searchUserEmail(data.email);
      console.log(response);
      handleNext(data.email);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Ooops!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-[821px] flex flex-col justify-center mx-auto min-h-screen my-[-60px]">
      <Card className="px-[3%] rounded-lg p-5 flex flex-col justify-center md:shadow-md">
        <CardHeader className="flex flex-col  gap-5">
          <div className="flex flex-col gap-3 ">
            <CardTitle className=" font-medium md:text-3xl text-xl text-primary_black_text font">
              Forgot Password
            </CardTitle>
            <CardDescription className="md:text-lg text-base font-normal text-[#BDBDBD]">
              Enter email attached to your account
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="mt-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              autoComplete="off"
              className="flex flex-col gap-[30px]"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-primary_black_text">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-16 text-placeholder_text font-sm font-normal"
                        autoComplete="false"
                        type="email"
                        placeholder="Enter your email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                  </FormItem>
                )}
              />

              <ButtonLoader loading={loading} text="Continue" />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
