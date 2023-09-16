import { SectionContainer } from "@/components/ui/section-container"
import { CardSkeleton } from "@/components/loaders/card-skeleton"

export default function DashboardBillingLoading() {
  return (
    <SectionContainer>
      <CardSkeleton />
    </SectionContainer>
  )
}
