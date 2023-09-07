import { Session, User } from "@supabase/supabase-js"

import { Database } from "@/types/types_db"

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import ManageSubscriptionButton from "./manage-button"

type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"]
type Product = Database["public"]["Tables"]["products"]["Row"]
type Price = Database["public"]["Tables"]["prices"]["Row"]
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
  user: User | null | undefined
  products: ProductWithPrices[]
  subscription: SubscriptionWithProduct | null
}

function Billing({ subscription, session, user, products }: BillingProps) {
  const currentPlan = subscription?.prices
  return (
    <>
      <Card className=" p-6">
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