"use client"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Session, User } from "@supabase/supabase-js"

import { Price, Product, Subscription, userDetails } from "@/types/tables_db"

import { toast } from "../ui/use-toast"
import { UpdateEmail } from "./update-email"
import { UpdateName } from "./update-name"

interface PriceWithProduct extends Price {
  products: Product | null
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null
}

interface AccountFormProps {
  session: Session | null
  user: User | null | undefined
  subscription: SubscriptionWithProduct | null
  userDetails: userDetails | null
}

function AccountForm(props: AccountFormProps) {
  const { session, user, userDetails } = props
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
