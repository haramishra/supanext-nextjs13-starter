import { useAuthStore } from "@/store/auth-store"

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import ManageSubscriptionButton from "./manage-button"

function Billing() {
  const { session, subscription } = useAuthStore.getState()
  console.log(subscription)
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
            {subscription?.cancel_at
              ? "Your plan will be canceled on "
              : "Your plan renews on "}
            {subscription?.current_period_end &&
              new Date(subscription?.current_period_end).toDateString()}
            .
          </div>
        </CardFooter>
      </Card>
    </>
  )
}

export default Billing
