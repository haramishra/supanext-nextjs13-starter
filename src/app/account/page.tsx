import { GetServerSideProps } from "next"

import { SectionContainer } from "@/components/ui/section-container"
import AccountForm from "@/components/account"
import Billing from "@/components/billing"

import {
  getActiveProductsWithPrices,
  getSession,
  getSubscription,
} from "../supabase-server"

export default async function Account() {
  const [session, products, subscription] = await Promise.all([
    getSession(),
    getActiveProductsWithPrices(),
    getSubscription(),
  ])
  return (
    <SectionContainer className="w-1/2 ">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        ACCOUNT
      </h1>
      <Billing
        session={session}
        user={session?.user}
        products={products}
        subscription={subscription}
      />
      <AccountForm />
    </SectionContainer>
  )
}
