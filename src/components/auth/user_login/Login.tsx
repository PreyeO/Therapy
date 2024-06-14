import { loginFormSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/ui/logos/Logo";
import { useNavigate } from "react-router-dom";
import { loginUser, setAuthToken } from "@/services/api/auth";
import LoginForm from "@/components/auth/user_login/LoginForm";

const Login = () => {
  const navigate = useNavigate();

  // call in react-hook-form validation
  const formMethods = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  // sending a request to login and navigate to dashboard on success
  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    try {
      const response = await loginUser(data);
      const token = response.token;
      setAuthToken(token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // using card and form from shadcn
  return (
    <div className="max-w-[821px] flex flex-col justify-center mx-auto py-10 h-screen">
      <Card className="md:px-[3%] rounded-lg">
        <CardHeader className="flex flex-col justify-center items-center gap-5">
          <Logo />
          <div className="flex flex-col gap-1 text-center">
            <CardTitle className="font-bold md:text-3xl text-xl text-primary_black_text">
              Login Account
            </CardTitle>
            <CardDescription className="md:text-lg text-base font-normal text-[#BDBDBD]">
              👋 Hey welcome back
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="mt-6">
          <FormProvider {...formMethods}>
            <form
              autoComplete="off"
              onSubmit={formMethods.handleSubmit(onSubmit)}
              className="flex flex-col gap-[30px]"
            >
              <LoginForm />
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
