"use client"

import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import PriceingCard from "../ui/priceingCard"

function Priceing() {
  return (
    <>
      <div className="flex justify-center w-full items-center p-20">
        <PriceingCard
          title="Hobby"
          description="For personal websites"
          price="$0/month"
        >
          <p>100 submits</p>
          <p>1 website</p>
        </PriceingCard>
        <PriceingCard
          varient="recommended"
          title="pro"
          description="For larger webistes like feedback page."
          price="$10/month"
          className="md:scale-110"
        >
          <p>10,000 submits</p>
          <p>100 website</p>
          <p>advanced security</p>
        </PriceingCard>
        <PriceingCard
          title="Enterprise"
          description="For enterprise"
          price="$40/month"
        >
          <p>Unlimited submits</p>
          <p>Unlimited website</p>
        </PriceingCard>
      </div>
    </>
  )
}

export default Priceing
