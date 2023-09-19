import { SectionContainer } from "@/components/ui/section-container"
import { CardSkeleton } from "@/components/loaders/card-skeleton"
import PricingCardSkeleton from "@/components/loaders/priceing-card-skeleton"

export default function DashboardBillingLoading() {
  return (
    <SectionContainer>
      <div className="flex gap-10">
        <PricingCardSkeleton />
        <PricingCardSkeleton />
      </div>
    </SectionContainer>
  )
}
