"use client"

import { useRef } from "react"
import {
  AuthStore,
  ProductStore,
  useAuthStore,
  useProductStore,
} from "@/store/auth-store"

export function AuthStoreInitializer({
  session,
  userDetails,
  subscription,
}: AuthStore) {
  const init = useRef(false)
  if (!init.current) {
    useAuthStore.setState({ session, userDetails, subscription })
    init.current = true
  }

  return null
}

export function ProductStoreInitializer({ products }: ProductStore) {
  const init = useRef(false)
  if (!init.current) {
    useProductStore.setState({ products })
    init.current = true
  }

  return null
}
