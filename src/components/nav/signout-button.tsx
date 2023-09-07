"use client"

import { useRouter } from "next/navigation"

import { useSupabase } from "@/app/supabase-provider"

import { Button } from "../ui/button"

export default function SignOutButton() {
  const router = useRouter()
  const { supabase } = useSupabase()
  return (
    <Button
      variant={"ghost"}
      onClick={async () => {
        await supabase.auth.signOut()
        router.push("/signin")
      }}
    >
      Sign out
    </Button>
  )
}
