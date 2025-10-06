"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";

// Zod schema with required fields and regex validation
const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
    .regex(
      /(?=.*[A-Z])(?=.*[0-9])/,
      "Password must have at least one uppercase letter and one number"
    ),
});

export default function ProfileForm() {
  const form = useForm({ resolver: zodResolver(formSchema) });
  const router = useRouter();
  const [signingIn, setSigningIn] = useState(false);
  const [lastPage, setLastPage] = useState("/");
  const [errorMessage, setErrorMessage] = useState("");

  // Get last page from sessionStorage
  useEffect(() => {
    const stored = sessionStorage.getItem("lastPage");
    if (stored && stored !== "/auth/login") {
      setLastPage(stored);
    }
  }, []);

  async function onSubmit(values: any) {
    setSigningIn(true);
    setErrorMessage("");
    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (response?.ok) {
        sessionStorage.setItem("isLoggedIn", "true");
        router.push(lastPage);
      } else {
        setErrorMessage("Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong. Please try again.");
    }
    setSigningIn(false);
  }

  return (
    <div className="max-w-2xl mx-auto my-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" type="email" {...field} />
                </FormControl>
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="**********" type="password" {...field} />
                </FormControl>
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </FormItem>
            )}
          />

          {errorMessage && (
            <p className="text-red-500 text-center text-sm">{errorMessage}</p>
          )}

          {/* Forgot password link */}
          <p className="text-center text-sm">
            <Link
              href="/auth/resetPassword"
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </p>

          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>

          <Button disabled={signingIn} type="submit" className="w-full">
            {signingIn ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
