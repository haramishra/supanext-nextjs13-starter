import { Session, User } from "@supabase/supabase-js"

import { Price, Product, Subscription } from "@/types/tables_db"
import { Database } from "@/types/types_db"

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import ManageSubscriptionButton from "./manage-button"

interface ProductWithPrices extends Product {
  prices: Price[]
}
interface PriceWithProduct extends Price {
  products: Product | null
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null
}
interface BillingProps {
  session: Session | null
  user?: User | null | undefined
  products?: ProductWithPrices[]
  subscription: SubscriptionWithProduct | null
}

function Billing({ subscription, session, user, products }: BillingProps) {
  const currentPlan = subscription?.prices
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Subscription plan</CardTitle>
          <CardDescription>
            You are currently on{" "}
            <span className="text-lg font-semibold">
              {subscription?.prices?.products?.name}
            </span>{" "}
            plan.
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-between">
          <ManageSubscriptionButton session={session} />
          <div>
            Your plan will renew on{" "}
            {new Date(subscription?.current_period_end || "").toDateString()}
          </div>
        </CardFooter>
      </Card>
    </>
  )
}

export default Billing
