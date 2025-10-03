"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import Link from "next/link"

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export default function ProfileForm() {
  const form = useForm()
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/products'
  const [signinigIn, setSigningIn] = useState(false)

  async function onSubmit(values: any) {
    setSigningIn(true)
    console.log("values", values)
    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl,
      })
      console.log("response", response)

      if (response?.ok) {
        router.push(callbackUrl)
      }
    } catch (error) {
      alert(JSON.stringify(error))
      console.log("HI")
    }
    setSigningIn(false)
  }

  return (
    <div className="max-w-2xl mx-auto my-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" type="email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="m-2">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="**********" type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <p className="text-center text-sm">
            Don’t have an account?{" "}
            <Link href="/auth/register" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>

          <Button disabled={signinigIn} type="submit">
            {signinigIn && <Loader2 className="animate-spin" />}
            Submit
            </Button>
        </form>
      </Form>
    </div>
  )
}
