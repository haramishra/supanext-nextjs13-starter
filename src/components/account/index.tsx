"use client"

import { useState } from "react"
import { useAuthStore } from "@/store/auth-store"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { toast } from "../ui/use-toast"
import { UpdateEmail } from "./update-email"
import { UpdateName } from "./update-name"

function AccountForm() {
  const { session, userDetails } = useAuthStore()

  const [nameLoading, setNameLoading] = useState(false)
  const supabase = createClientComponentClient()
  const updateName = async (newName: string) => {
    setNameLoading(true)
    const user = session?.user
    const { error } = await supabase
      .from("users")
      .update({ full_name: newName })
      .eq("id", user?.id || "")
    setNameLoading(false)
    if (error) {
      toast({
        title: "Error updating Name.",
        description: error.message,
      })
    }
  }
  return (
    <div className="space-y-6">
      <UpdateName
        updateName={(newName: string) => updateName(newName)}
        fullName={userDetails?.full_name}
        loading={nameLoading}
      />
      <UpdateEmail />
    </div>
  )
}

export default AccountForm
