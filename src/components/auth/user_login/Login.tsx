import { loginFormSchema } from "@/types/formSchema";
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
import { Link, useNavigate } from "react-router-dom";
import { loginUser, setAuthToken } from "@/services/api/authentication/auth";
import LoginForm from "@/components/auth/user_login/LoginForm";
import { ToastContainer, toast } from "react-toastify";
import ButtonLoader from "@/components/ui/loader_effects/ButtonLoader";
import { useAuthState } from "@/store";

const Login = () => {
  const navigate = useNavigate();
  const { loading, setLoading } = useAuthState();

  // call in react-hook-form validation
  const formMethods = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  // sending a request to login and navigate to dashboard on success
  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    setLoading(true);
    try {
      const response = await loginUser(data);
      const token = response.token;
      setAuthToken(token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      if (error instanceof Error) {
        toast.error(error.message || "Ooops!");
      } else {
        toast.error("OOOPS! An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  // using card and form from shadcn
  return (
    <div className="max-w-[821px] flex flex-col justify-center mx-auto py-10 h-screen">
      <Card className="md:px-[3%] rounded-lg md:shadow-md">
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
              <ButtonLoader loading={loading} text="Login" className="h-14" />

              <p className="flex w-full gap-1 items-center justify-center text-center font-normal text-base text-primary_black_text">
                New to R&R Therapy?
                <Link to="/signup">
                  <span className="text-army_green underline font-bold">
                    Sign Up here
                  </span>
                </Link>
              </p>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
      <ToastContainer
        toastStyle={{ backgroundColor: "crimson", color: "white" }}
        className="text-white"
      />
    </div>
  );
};

export default Login;
