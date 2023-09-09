import * as React from "react"

import { cn } from "@/lib/utils"

export const SectionContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <section
    ref={ref}
    className={cn(
      "container grid items-center gap-6 pb-8 pt-6 md:py-10",
      className
    )}
    {...props}
  />
))

SectionContainer.displayName = "SectionContainer"
