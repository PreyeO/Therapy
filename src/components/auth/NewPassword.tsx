import { userDetailsRegisterSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Button } from "../ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import PasswordValidation from "@/components/functions/PasswordValidation";
import PasswordToggle from "@/components/functions/passwordToggle"; // Import the PasswordToggle component

const NewPassword = () => {
  const form = useForm<z.infer<typeof userDetailsRegisterSchema>>({
    resolver: zodResolver(userDetailsRegisterSchema),
  });

  const password = form.watch("password", "");

  function onSubmit(data: z.infer<typeof userDetailsRegisterSchema>) {
    console.log(data);
  }

  return (
    <div className="max-w-[821px]  flex flex-col justify-center mx-auto py-10 h-screen">
      <Card className="px-[3%] rounded-lg">
        <CardHeader className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 ">
            <CardTitle className="font-medium text-3xl text-primary_black_text font">
              Change Password
            </CardTitle>
            <CardDescription className="text-lg font-normal text-[#BDBDBD]">
              Enter your new password
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="mt-6">
          <Form {...form}>
            <form
              autoComplete="off"
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-[30px]"
            >
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-primary_black_text">
                      Create password
                    </FormLabel>
                    <FormControl>
                      <PasswordToggle
                        field={field}
                        placeholder="Enter your password"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-primary_black_text">
                      Re-enter Password
                    </FormLabel>
                    <FormControl>
                      <PasswordToggle
                        field={field}
                        placeholder="Re-enter password"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <PasswordValidation password={password} />

              <Button
                type="submit"
                className="h-[71px] w-full bg-army_green text-white text-xl font-medium rounded-full"
              >
                Change Password
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewPassword;
