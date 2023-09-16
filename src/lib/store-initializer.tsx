"use client"

import { useRef } from "react"
import {
  AuthStore,
  ProductStore,
  useAuthStore,
  useProductStore,
} from "@/store/auth-store"

export function AuthStoreInitializer({ session, userDetails }: AuthStore) {
  const init = useRef(false)
  if (!init.current) {
    useAuthStore.setState({ session, userDetails })
    init.current = true
  }

  return null
}

export function ProductStoreInitializer({
  products,
  subscription,
}: ProductStore) {
  const init = useRef(false)
  if (!init.current) {
    useProductStore.setState({ products, subscription })
    init.current = true
  }

  return null
}
