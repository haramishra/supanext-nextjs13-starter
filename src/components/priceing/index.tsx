"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore, useProductStore } from "@/store/auth-store"
import { postData } from "@/utils/helpers"
import { getStripe } from "@/utils/stripe-client"

import { Price } from "@/types/tables_db"

import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"

type BillingInterval = "lifetime" | "year" | "month"

function Priceing() {
  const { session } = useAuthStore()
  const { products, subscription } = useProductStore()
  const user = session?.user

  const intervals = Array.from(
    new Set(
      products?.flatMap((product) =>
        product?.prices?.map((price) => price?.interval)
      )
    )
  )

  const router = useRouter()

  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>("year")
  const [priceLoading, setPriceLoading] = useState<string>()

  const handleCheckout = async (price: Price) => {
    setPriceLoading(price.id)
    if (!user) {
      return router.push("/signin")
    }
    if (subscription) {
      return router.push("/account")
    }
    try {
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price },
      })
      const stripe = await getStripe()
      stripe?.redirectToCheckout({ sessionId })
    } catch (error) {
      //set alert to popup
      return alert((error as Error)?.message)
    } finally {
      setPriceLoading(undefined)
    }
  }

  if (!products?.length) {
    return (
      <>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Error Loading Prices
        </h2>
      </>
    )
  }

  return (
    <>
      <div className={"flex w-full gap-10"}>
        {products?.map((product, index) => {
          const price = product?.prices?.find(
            (price) => price.interval === billingInterval
          )
          if (!price) return null
          const priceString = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: price.currency!,
            minimumFractionDigits: 0,
          }).format((price?.unit_amount || 0) / 100)
          return (
            <Card key={product.id} className="w-full">
              <CardHeader className="flex items-center justify-center">
                <CardTitle>
                  <div className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    {product.name}
                  </div>
                </CardTitle>
                <span className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"></span>
                <CardDescription>
                  <span className="white text-5xl font-extrabold">
                    {priceString}
                  </span>
                  <span className="text-base font-medium text-zinc-100">
                    /{billingInterval}
                  </span>
                </CardDescription>
              </CardHeader>
              {/* <CardContent className="px-10">{}</CardContent> */}
              <CardFooter className="px-10">
                <Button
                  type="button"
                  size="thicc"
                  disabled={!session || priceLoading === price.id}
                  onClick={() => handleCheckout(price)}
                  className="w-full"
                >
                  Subscribe
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </>
  )
}

export default Priceing
