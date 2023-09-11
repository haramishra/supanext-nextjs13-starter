import { useAuthStore, useProductStore } from "@/store/auth-store"

import {
  AuthStoreInitializer,
  ProductStoreInitializer,
} from "@/lib/store-initializer"
// import useStore from "@/lib/use-store"
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
  useAuthStore.setState({ session: session })
  useProductStore.setState({
    products,
    subscription,
  })

  return (
    <SectionContainer>
      <AuthStoreInitializer session={session} />
      <ProductStoreInitializer
        products={products}
        subscription={subscription}
      />
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          {subscription ? "Billing" : "Priceing"}
        </h1>
      </div>

      {!subscription ? <Priceing /> : <Billing />}
    </SectionContainer>
  )
}
