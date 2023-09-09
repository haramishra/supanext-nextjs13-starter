import { Database } from "./types_db"

// types for all tables

export type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"]
export type Product = Database["public"]["Tables"]["products"]["Row"]
export type Price = Database["public"]["Tables"]["prices"]["Row"]
export type userDetails = Database["public"]["Tables"]["users"]["Row"]
