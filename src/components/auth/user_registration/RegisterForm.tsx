import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Checkbox } from "../../ui/checkbox";
import PasswordValidation from "@/components/functions/PasswordValidation";
import PasswordToggle from "@/components/functions/passwordToggle";
import { userDetailsRegisterSchema } from "@/types";
// import { Button } from "@/components/ui/button";

interface RegisterFormFieldsProps {
  passwordMatchError: string;
}

const RegisterForm: FC<RegisterFormFieldsProps> = ({ passwordMatchError }) => {
  const form = useFormContext<z.infer<typeof userDetailsRegisterSchema>>();

  // setting state for the password validations
  const [isPasswordTouched, setIsPasswordTouched] = useState<boolean>(false);

  const password = form.watch("password", "");

  return (
    <div className="flex flex-col gap-5">
      <FormField
        control={form.control}
        name="first_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium text-primary_black_text">
              First Name
            </FormLabel>
            <FormControl>
              <Input
                className="h-16 text-placeholder_text font-sm font-normal"
                autoComplete="false"
                placeholder="Enter your first name"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-[#E75F51] text-[13px] font-light" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="last_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium text-primary_black_text">
              Last Name
            </FormLabel>
            <FormControl>
              <Input
                className="h-16 text-placeholder_text font-sm font-normal"
                autoComplete="false"
                placeholder="Enter your last name"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-[#E75F51] text-[13px] font-light" />
          </FormItem>
        )}
      />
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
                placeholder="Enter your email address"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-[#E75F51] text-[13px] font-light" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium text-primary_black_text">
              Password
            </FormLabel>
            <FormControl>
              {/* handling the input hidden and show password */}
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
        name="confirm_password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium text-primary_black_text">
              Confirm Password
            </FormLabel>
            <FormControl>
              <PasswordToggle field={field} placeholder="Re-enter password" />
            </FormControl>
            {passwordMatchError && (
              <p className="text-[#E75F51] text-[13px] font-light">
                {passwordMatchError}
              </p>
            )}
            <FormMessage className="text-[#E75F51] text-[13px] font-light" />
          </FormItem>
        )}
      />
      {isPasswordTouched && <PasswordValidation password={password} />}
      <FormField
        control={form.control}
        name="terms"
        render={({ field }) => (
          <FormItem>
            <div className="flex gap-1 items-center mt-4">
              <FormControl>
                <Checkbox
                  className=" bg-white border-2 border-army_green w-5 h-5 mr-2  data-[state=checked]:bg-white data-[state=checked]:text-army_green"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="text-sm font-normal text-placeholder_text ">
                I agree to the
                <Link to="/terms" className="">
                  <span className="text-army_green font-medium">
                    Terms & Conditions
                  </span>
                </Link>
              </FormLabel>
            </div>
            <FormMessage className="text-[#E75F51] text-[13px] font-light" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default RegisterForm;
