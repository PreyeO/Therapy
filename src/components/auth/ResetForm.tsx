import { FC } from "react";
import { handleNextProps, resetPasswordSchema } from "@/types";
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
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const ResetForm: FC<handleNextProps> = ({ handleNext }) => {
  const schema = resetPasswordSchema.pick({
    email: true,
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  function onSubmit(data: z.infer<typeof schema>) {
    console.log(data);
    handleNext();
  }

  return (
    <div className="max-w-[821px] flex flex-col justify-center mx-auto min-h-screen">
      <Card className="px-[3%] rounded-lg h-[454px] ">
        <CardHeader className="flex flex-col  gap-5">
          <div className="flex flex-col gap-3 ">
            <CardTitle className=" font-medium text-3xl text-primary_black_text font">
              Forgot Password
            </CardTitle>
            <CardDescription className="text-lg font-normal text-[#BDBDBD]">
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

              <Button
                type="submit"
                className="h-[71px] w-full bg-army_green text-white text-xl font-medium rounded-full mt-3"
              >
                Continue
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
