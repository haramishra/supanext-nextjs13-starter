import { SectionContainer } from "@/components/ui/section-container"
import AccountForm from "@/components/account"
import Billing from "@/components/billing"

import { getSession, getSubscription, getUserDetails } from "../supabase-server"

export default async function Account() {
  const [session, userDetails, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscription(),
  ])
  return (
    <SectionContainer className="w-1/2 ">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        ACCOUNT
      </h1>
      <Billing session={session} subscription={subscription} />
      <AccountForm
        session={session}
        user={session?.user}
        userDetails={userDetails}
        subscription={subscription}
      />
    </SectionContainer>
  )
}
