import { useAuthStore } from "@/store/auth-store"

import { SectionContainer } from "@/components/ui/section-container"
import AccountForm from "@/components/account"
import Billing from "@/components/billing"

export default async function Account() {
  const subscription = useAuthStore.getState().subscription
  return (
    <SectionContainer className="w-1/2 ">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        ACCOUNT
      </h1>
      {subscription?.prices?.products && <Billing />}
      <AccountForm />
    </SectionContainer>
  )
}
