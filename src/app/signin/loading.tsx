import { SectionContainer } from "@/components/ui/section-container"
import AuthSkeleton from "@/components/loaders/auth-skeleton"

export default function DashboardBillingLoading() {
  return (
    <SectionContainer className="m-w-xs">
      <AuthSkeleton />
    </SectionContainer>
  )
}
