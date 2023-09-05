import { SectionContainer } from "@/components/ui/section-container"
import Billing from "@/components/billing"
import Priceing from "@/components/priceing"

import {
  getActiveProductsWithPrices,
  getSession,
  getSubscription,
} from "./supabase-server"

export default async function IndexPage() {
  const [session, products, subscription] = await Promise.all([
    getSession(),
    getActiveProductsWithPrices(),
    getSubscription(),
  ])
  console.log(subscription)
  return (
    <SectionContainer>
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          {subscription ? "Billing" : "Priceing"}
        </h1>
      </div>

      {!subscription ? (
        <Priceing
          session={session}
          user={session?.user}
          products={products}
          subscription={subscription}
        />
      ) : (
        <Billing />
      )}

      <Billing />
    </SectionContainer>
  )
}
