import { z } from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import PasswordToggle from "@/components/functions/passwordToggle";
import { Link } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { loginFormSchema } from "@/types";

const LoginForm = () => {
  const form = useFormContext<z.infer<typeof loginFormSchema>>();

  return (
    <div className="flex flex-col gap-5">
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
                placeholder="Enter your email"
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
              Create password
            </FormLabel>
            <FormControl>
              <PasswordToggle field={field} placeholder="Enter your password" />
            </FormControl>
            <FormMessage />

            <Link to="/passwordreset">
              <FormDescription className="font-bold text-army_green cursor-pointer text-base text-right pt-1">
                Forget password?
              </FormDescription>
            </Link>
          </FormItem>
        )}
      />

      <Button
        type="submit"
        className="h-[71px] w-full bg-army_green text-white text-xl font-medium rounded-full"
      >
        Login
      </Button>

      <p className="flex w-full gap-1 items-center justify-center text-center font-normal text-base text-primary_black_text">
        New to R&R Therapy?
        <Link to="/signup">
          <span className="text-army_green underline font-bold">
            Sign Up here
          </span>
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
