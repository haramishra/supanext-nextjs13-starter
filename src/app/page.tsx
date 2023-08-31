"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Product, useProduct } from "@/store/productStore"
import useSWR from "swr"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { SectionContainer } from "@/components/ui/section-container"
import Priceing from "@/components/priceing"

export default function IndexPage() {
  const product = useProduct((s) => s.product)
  const setProduct = useProduct((s) => s.setProduct)

  const productFetcher = (url: string) => fetch(url).then((r) => r.json())

  const { data, isLoading, error } = useSWR(
    "https://dummyjson.com/products/1",
    productFetcher
  )

  console.log(product)

  const fetchProducts = () => {
    data && setProduct(data)
  }

  useEffect(() => {
    fetchProducts()
  }, [data])

  return (
    <SectionContainer>
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Beautifully designed components <br className="hidden sm:inline" />
          built with Radix UI and Tailwind CSS.
        </h1>
      </div>
      <Priceing />
    </SectionContainer>
  )
}
