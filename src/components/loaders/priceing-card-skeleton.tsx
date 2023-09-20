import { buttonVariants } from "../ui/button"
import { Card, CardFooter, CardHeader } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

function PricingCardSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader className="grid place-items-center space-y-6">
        <Skeleton className="h-5 w-1/4 bg-white" />
        <Skeleton className="h-6 w-1/3" />
      </CardHeader>
      {/* <CardContent className="px-10">{}</CardContent> */}
      <CardFooter className="p-8">
        <div
          className={buttonVariants({
            variant: "default",

            size: "thicc",
            className: "w-full opacity-50",
          })}
        >
          <span>Subscribe</span>
        </div>
      </CardFooter>
    </Card>
  )
}

export default PricingCardSkeleton
