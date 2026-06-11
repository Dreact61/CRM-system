import { create } from "zustand";
import { Deal, Good } from "./types.ts";
import axios from "axios";

const DEALS = `http://localhost:5000/api/deals`

export type salesValues = {
    name: string,
    id: number,
    price: number,
    desc: string,
    quantity: number,
    sum: number,
    dealerName: string,
    customerName: string
}

export type salesStore = {
    allDeals: Deal[],
    allSales: salesValues[]
    currencyPlan: number,
    error: string | null,
    loading: boolean,
    initializeSales: () => Promise<void>,
    getTotalRevenue: () => number
}

const StoreSales = create<salesStore>()(
    (set, get) => ({
        allDeals: [],
        allSales: [],
        currencyPlan: 800000,
        error: null,
        loading: false,

        initializeSales: async () => {
            try {
                set({ loading: true, error: null })

                const deals = await axios.get<Deal[]>(DEALS)
                const safeDeals = Array.isArray(deals?.data) ? deals.data : []

                const successfulDeals = safeDeals.filter(deal => deal.dealStatus === "successful")

                const soldGoods: salesValues[] = []

                successfulDeals.forEach(deal => {
                    deal?.clientBuys.forEach((item: Good) => {
                        const existingSale = soldGoods.find(sale => sale.id === item.id)

                        if (existingSale) {
                            existingSale.quantity += item.quantity
                            existingSale.sum += item.price * item.quantity
                        } else {
                            soldGoods.push({
                                name: item.name,
                                id: item.id,
                                price: item.price,
                                desc: item.desc,
                                quantity: item.quantity,
                                sum: item.price * item.quantity,
                                dealerName: deal.dealerName,
                                customerName: deal.clientName
                            })
                        }
                    })
                })
                
                set({
                    allDeals: safeDeals,
                    allSales: soldGoods,
                    loading: false
                })
            } catch (err: any) {
                console.error(`Error: ${err.message}`)
                set({ error: err.message, loading: false, allDeals: [], allSales: [] })
            }
        },

        getTotalRevenue: () => {
            const { allSales } = get()
            return allSales.reduce((sum, item) => sum + item.sum, 0)
        },
    }
    )
)

export default StoreSales