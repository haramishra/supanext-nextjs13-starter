import { NextRequest, NextResponse } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/types_db"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })
  console.log("this is middleware")
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user && req.nextUrl.pathname === "/signin") {
    return NextResponse.redirect(new URL("/account", req.url))
  }

  // if user is signed in and the current path is / redirect the user to /account
  // if (user && req.nextUrl.pathname === "/") {
  //   return NextResponse.redirect(new URL("/account", req.url))
  // }

  // if user is not signed in and the current path is not /account redirect the user to /
  if (!user && req.nextUrl.pathname === "/account") {
    return NextResponse.redirect(new URL("/signin", req.url))
  }

  return res
}

export const config = {
  matcher: ["/", "/account", "/signin"],
}
