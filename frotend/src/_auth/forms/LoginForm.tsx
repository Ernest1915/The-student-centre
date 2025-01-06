import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useToast } from "@/hooks/use-toast";
import { LoginValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { SignInAccount } from "@/lib/appwrite/api";

const SignInForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Define the form schema
  const form = useForm<z.infer<typeof LoginValidation>>({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function loginUser(email: string, password: string) {
    try {
      const session = await SignInAccount({ email, password });

      if (!session || !session.$id) {
        throw new Error("Login failed: Token is missing");
      }

      return session;
    } catch (error: any) {
      const errorMessage =
        error.message || "An error occurred. Please try again.";
      throw new Error(errorMessage);
    }
  }

  async function onSubmit(values: z.infer<typeof LoginValidation>) {
    try {
      const session = await loginUser(values.email, values.password);

      if (!session || !session.$id) {
        throw new Error("Invalid login response: Token is missing");
      }

      localStorage.setItem("authToken", session.$id);

      form.reset();
      navigate("/");

      toast({ title: "Login successful" });
    } catch (error: any) {
      toast({ title: error.message });
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/icons/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Login to your account
        </h2>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {form.formState.isSubmitting ? (
              <div className="flex center gap-2">
                <Loader /> Logging in...
              </div>
            ) : (
              "Login"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Don't have an account?
            <Link
              to="/sign-up"
              className="text-primary-500 text-small-semibold ml-1"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignInForm;
