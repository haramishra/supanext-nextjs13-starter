import * as React from "react"

import { cn } from "@/lib/utils"

import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"

interface PriceingCardProps {
  title: string
  description: string
  price: string
  children: React.ReactNode
  buttonText?: string
  varient?: "default" | "recommended"
  className?: string
}

function PriceingCard(props: PriceingCardProps) {
  const {
    title,
    description,
    price,
    children,
    buttonText,
    varient,
    className,
  } = props
  return (
    <>
      <div className={cn("w-full", className)}>
        <Card>
          <CardHeader className="flex justify-center items-center">
            {varient === "recommended" && (
              <div className="mt-10 scroll-m-20 pb-2 text-xl  tracking-tight transition-colors first:mt-0">
                Most popular
              </div>
            )}
            <CardTitle>{title}</CardTitle>
            <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              {price}
            </h2>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="px-10">{children}</CardContent>
          <CardFooter className="px-10">
            <Button
              className="w-full"
              variant={varient === "recommended" ? "default" : "outline"}
            >
              {buttonText || "Get Started"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

export default PriceingCard
