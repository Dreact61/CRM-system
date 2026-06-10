import { create } from "zustand"
import { persist } from "zustand/middleware"
import axios from "axios"
import { Deal } from "./types.ts"

const API_URL = `http://localhost:5000/api/deals`

export type StoreType = {
    allDeals: Deal[],
    plan: number,
    loading: boolean,
    error: string | null
    initDeals: () => Promise<void>,
    calculateSum: (deal: Deal) => number,
} 

const StoreDeals = create<StoreType>()(
        (set) => ({
            allDeals: [],
            plan: 7,
            loading: false,
            error: null,

            initDeals: async () => {
                try {
                    set({loading: true, error: null})

                    const res = await axios.get<Deal[]>(`${API_URL}`)
                    set({allDeals: res.data, loading: false})
                } catch(err:any) {
                   console.error(`Error: ${err.message}`)
                   set({error: err.message, loading: false})
                }
            },

            calculateSum: (deal) => {
              if (!deal || !deal.clientBuys || !Array.isArray(deal.clientBuys)) return 0

                return deal.clientBuys.reduce((sum, item) => {
                    return sum + (item.price * item.quantity)
                }, 0)
            }
        })
)

export default StoreDeals