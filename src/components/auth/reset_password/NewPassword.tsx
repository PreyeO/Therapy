import { FC, useState } from "react";
import { handleNextProps, resetPasswordSchema } from "@/types/formSchema";
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
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PasswordValidation from "@/components/common/PasswordValidation";
import PasswordToggle from "@/components/common/passwordToggle";

export const NewPassword: FC<handleNextProps> = ({ handleNext }) => {
  const [passwordMatchError, setPasswordMatchError] = useState<string>("");
  const [isPasswordTouched, setIsPasswordTouched] = useState<boolean>(false);

  const schema = resetPasswordSchema.pick({
    newPassword: true,
    confirmPassword: true,
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const password = form.watch("newPassword", "");

  function onSubmit(data: z.infer<typeof schema>) {
    if (data.newPassword !== data.confirmPassword) {
      setPasswordMatchError("Passwords do not match");
      return;
    }
    setPasswordMatchError("");
    handleNext(data.newPassword, data.confirmPassword, "");
  }

  return (
    <div className="max-w-[821px] flex flex-col justify-center mx-auto max-h-screen my-8">
      <Card className="md:px-[3%] rounded-lg md:p-5 flex flex-col justify-center md:shadow-md">
        <CardHeader className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <CardTitle className="font-medium md:text-3xl text-xl text-primary_black_text font">
              Change Password
            </CardTitle>
            <CardDescription className="md:text-lg text-base font-normal text-[#BDBDBD]">
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
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-primary_black_text">
                      Create password
                    </FormLabel>
                    <FormControl>
                      <PasswordToggle
                        field={{
                          ...field,
                          onChange: (e) => {
                            field.onChange(e);
                            if (!isPasswordTouched) {
                              setIsPasswordTouched(true);
                            }
                          },
                        }}
                        placeholder="Enter your password"
                      />
                    </FormControl>
                    <FormMessage className="text-[#E75F51] text-[13px] font-light" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
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
                    {passwordMatchError && (
                      <FormMessage className="text-[#E75F51] text-[13px] font-light">
                        {passwordMatchError}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
              {isPasswordTouched && <PasswordValidation password={password} />}

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
