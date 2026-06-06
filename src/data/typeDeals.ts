import { create } from "zustand"
import { persist } from "zustand/middleware"
import deals from "../data/deals.json" with {type: "json"}
import { Deal } from "./types.ts"

export const allDeals = deals.deals

export type StoreType = {
    allDeals: Deal[],
    plan: number,
    initDeals: (deals: Deal[]) => void,
    calculateSum: (deal: Deal) => number
} 

const StoreDeals = create<StoreType>()(
    persist(
        (set) => ({
            allDeals: [],
            plan: 7,

            initDeals: (incomingDeals) => set({allDeals: incomingDeals}),

            calculateSum: (deal) => {
              if (!deal || !deal.clientBuys || !Array.isArray(deal.clientBuys)) return 0

                return deal.clientBuys.reduce((sum, item) => {
                    return sum + (item.price * item.quantity)
                }, 0)
            }
        }),
        {name: "all-deals"}
    )
)

export default StoreDeals