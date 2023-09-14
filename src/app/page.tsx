import { useAuthStore, useProductStore } from "@/store/auth-store"

import { ProductStoreInitializer } from "@/lib/store-initializer"
// import useStore from "@/lib/use-store"
import { SectionContainer } from "@/components/ui/section-container"
import Billing from "@/components/billing"
import Priceing from "@/components/priceing"

import { getActiveProductsWithPrices } from "./supabase-server"

export default async function IndexPage() {
  const subscription = useAuthStore.getState().subscription

  console.log(useAuthStore.getState())

  const products = await getActiveProductsWithPrices()

  useProductStore.setState({
    products,
  })

  return (
    <SectionContainer>
      <ProductStoreInitializer products={products} />
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          {subscription ? "Billing" : "Priceing"}
        </h1>
      </div>

      {!subscription ? <Priceing /> : <Billing />}
    </SectionContainer>
  )
}
