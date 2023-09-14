import "@/styles/globals.css"
import { Metadata } from "next"
import { useAuthStore } from "@/store/auth-store"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { AuthStoreInitializer } from "@/lib/store-initializer"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

import SupabaseProvider from "./supabase-provider"
import { getSession, getSubscription, getUserDetails } from "./supabase-server"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export const dynamic = "force-dynamic"

export default async function RootLayout({ children }: RootLayoutProps) {
  //fetches auth details and sets a global store
  const [session, userDetails, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscription(),
  ])

  useAuthStore.setState({
    session,
    userDetails,
    subscription,
  })

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <SupabaseProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="relative flex min-h-screen flex-col">
                <SiteHeader />
                <AuthStoreInitializer
                  subscription={subscription}
                  session={session}
                  userDetails={userDetails}
                />
                <div className="flex-1">{children}</div>
                <Toaster />
              </div>

              <TailwindIndicator />
            </ThemeProvider>
          </SupabaseProvider>
        </body>
      </html>
    </>
  )
}
