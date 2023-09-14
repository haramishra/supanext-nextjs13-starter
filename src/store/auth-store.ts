import { Session } from "@supabase/supabase-js"
import { create } from "zustand"

// import { createJSONStorage, persist } from "zustand/middleware"

import { Price, Product, Subscription, UserDetails } from "@/types/tables_db"

interface ProductWithPrices extends Product {
  prices: Price[]
}
interface PriceWithProduct extends Price {
  products: Product | null
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null
}

export interface AuthStore {
  session: Session | null
  userDetails?: UserDetails | null
  subscription: SubscriptionWithProduct | null
}

export interface ProductStore {
  products?: ProductWithPrices[] | null
}

export const useAuthStore = create<AuthStore>()((set, get) => ({
  session: null,
  userDetails: null,
  subscription: null,
}))

export const useProductStore = create<ProductStore>()((set, get) => ({
  products: null,
}))
