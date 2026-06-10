import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Deal, Good } from "./types.ts";
import axios from "axios";

const DEALS = `http://localhost:5000/api/deals`
const GOODS = `http://localhost:5000/api/goods`

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
    values: salesValues[],
    allDeals: Deal[],
    allGoods: Good[],
    currencyPlan: number,
    error: string | null,
    loading: boolean,
    initDeals: () => Promise<void>,
    initGoods: () => Promise<void>,
    initializeSales: () => salesValues[],
    getTotalRevenue: () => number
}
 
const StoreSales = create<salesStore>()(
        (set, get) => ({
                values: [],
                allDeals: [],
                allGoods: [],
                currencyPlan: 800000,
                error: null,
                loading: false,

                initDeals: async() => {
                    try {
                        set({loading: true, error: null})

                        const deals = await axios.get<Deal[]>(`${DEALS}`)
                        set({allDeals: deals.data, loading: false})
                    } catch (err: any) {
                        console.error(`Error: ${err.message}`)
                        set({error: err.message, loading: false})
                    }
                },

                initGoods: async() => {
                    try {
                        set({loading: true, error: null})

                        const goods = await axios.get<Good[]>(`${GOODS}`)
                        set({allGoods: goods.data, loading: false})
                    } catch (err: any) {
                        console.error(`Error: ${err.message}`)
                        set({error: err.message, loading: false})
                    }
                },

                initializeSales: () => {
                    const {allDeals} = get()
                    const successfulDeals = allDeals.filter(deal => deal.dealStatus === "successful")

                    const soldGoods: salesValues[] = []
                
                    successfulDeals.forEach(deal => {
                        deal.clientBuys.forEach((item:Good) => {
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
                    return soldGoods
                },
                
                getTotalRevenue: () => {
                    const {values} = get()
                    return values.reduce((sum, item) => sum + item.sum, 0)
                },
            }
        )
)

export default StoreSales