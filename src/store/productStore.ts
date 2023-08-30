import { create } from "zustand"

export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string // You can replace this with the actual type for thumbnails
  images: string[] // You can replace this with the actual type for images
}

interface ProductStore {
  product: Product | null
  setProduct: (data: Product) => void
}

export const useProduct = create<ProductStore>()((set) => ({
  product: null,
  setProduct: (data: Product) => set((s) => ({ product: data })),
}))
