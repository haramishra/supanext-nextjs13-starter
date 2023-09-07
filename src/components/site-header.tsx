import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { getSession } from "@/app/supabase-server"

import SignOutButton from "./nav/signout-button"

export async function SiteHeader() {
  const session = await getSession()
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {!session?.user ? (
              <>
                <Link href={"/signin"}>
                  <div
                    className={buttonVariants({
                      variant: "ghost",
                    })}
                  >
                    <span>Login</span>
                  </div>
                </Link>
                <Link href={"/signin"}>
                  <div
                    className={buttonVariants({
                      variant: "default",
                    })}
                  >
                    <span>Sign up</span>
                  </div>
                </Link>
              </>
            ) : (
              <SignOutButton />
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
