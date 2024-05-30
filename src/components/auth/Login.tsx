import { loginFormSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
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
import Logo from "@/components/ui/logos/Logo";
import { Link } from "react-router-dom";

import PasswordToggle from "@/components/functions/passwordToggle"; // Import the PasswordToggle component

const Login = () => {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  function onSubmit(data: z.infer<typeof loginFormSchema>) {
    console.log(data);
  }

  return (
    <div className="max-w-[821px]  flex flex-col justify-center mx-auto py-10 h-screen">
      <Card className="px-[3%] rounded-lg">
        <CardHeader className="flex flex-col justify-center items-center gap-5">
          <Logo />
          <div className="flex flex-col gap-1 text-center">
            <CardTitle className="font-bold text-2xl text-primary_black_text">
              Login Account
            </CardTitle>
            <CardDescription className="text-lg font-normal text-[#BDBDBD]">
              👋 Hey welcome back
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
                      <PasswordToggle
                        field={field}
                        placeholder="Enter your password"
                      />
                    </FormControl>
                    <FormMessage />

                    <FormDescription className=" font-bold text-army_green cursor-pointer text-base text-right">
                      Forget password?
                    </FormDescription>
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
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
