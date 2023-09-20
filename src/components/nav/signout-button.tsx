"use client"

import { useRouter } from "next/navigation"

import { useSupabase } from "@/app/supabase-provider"

import { Button } from "../ui/button"

export default function SignOutButton() {
  const router = useRouter()
  const { supabase } = useSupabase()
  return (
    <form action="/auth/sign-out" method="post">
      <Button variant={"ghost"}>Sign out</Button>
    </form>
  )
}
