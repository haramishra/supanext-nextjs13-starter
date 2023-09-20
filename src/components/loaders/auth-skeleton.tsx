import { Button, buttonVariants } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Skeleton } from "../ui/skeleton"

function AuthSkeleton() {
  return (
    <Card className="w-full">
      <CardContent className="grid place-items-center space-y-6">
        <Skeleton className="h-8 w-1/4 " />
        <Skeleton className="h-8 w-1/4" />
      </CardContent>
      {/* <CardContent className="px-10">{}</CardContent> */}
      <CardFooter className="p-8">
        <div
          className={buttonVariants({
            variant: "default",

            size: "thicc",
            className: "w-full opacity-50",
          })}
        >
          <span>signin</span>
        </div>
      </CardFooter>
    </Card>
  )
}

export default AuthSkeleton
