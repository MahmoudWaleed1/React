
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
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { apiService } from "@/services/api";

// Zod schema for email validation
const resetSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
});

export default function ResetPassword() {
  const form = useForm({ resolver: zodResolver(resetSchema) });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(values) {
    setSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const res = await apiService.resetPassword(values.email);

      if (res.statusMsg === "success") {
        setSuccessMessage("Password reset email sent! Please check your inbox.");
      } else {
        setErrorMessage(res.message || "Failed to send reset email.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong. Please try again.");
    }

    setSubmitting(false);
  }

  return (
    <div className="max-w-2xl mx-auto my-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
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

          {successMessage && (
            <p className="text-green-600 text-center text-sm">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-red-500 text-center text-sm">{errorMessage}</p>
          )}

          <p className="text-center text-sm">
            Remembered your password?{" "}
            <Link
              href="/auth/login"
              className="text-blue-600 hover:underline"
            >
              Back to Login
            </Link>
          </p>

          <Button disabled={submitting} type="submit" className="w-full">
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending Reset Link...
              </>
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
