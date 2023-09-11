import { Session } from "@supabase/supabase-js"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

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
}

export interface ProductStore {
  products?: ProductWithPrices[] | null
  subscription: SubscriptionWithProduct | null
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      session: null,
      userDetails: null,
    }),
    {
      name: "authStore", // name of the item in the storage (must be unique)
    }
  )
)

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: null,
      subscription: null,
    }),
    {
      name: "productStore", // name of the item in the storage (must be unique)
    }
  )
)
