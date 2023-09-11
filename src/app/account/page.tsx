import { useAuthStore, useProductStore } from "@/store/auth-store"

import {
  AuthStoreInitializer,
  ProductStoreInitializer,
} from "@/lib/store-initializer"
import { SectionContainer } from "@/components/ui/section-container"
import AccountForm from "@/components/account"
import Billing from "@/components/billing"

import { getSession, getSubscription, getUserDetails } from "../supabase-server"

export default async function Account() {
  const [session, userDetails, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscription(),
  ])

  useAuthStore.setState({ session: session, userDetails })
  useProductStore.setState({
    subscription,
  })

  return (
    <SectionContainer className="w-1/2 ">
      <AuthStoreInitializer session={session} userDetails={userDetails} />
      <ProductStoreInitializer subscription={subscription} />
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        ACCOUNT
      </h1>
      <Billing />
      <AccountForm />
    </SectionContainer>
  )
}
