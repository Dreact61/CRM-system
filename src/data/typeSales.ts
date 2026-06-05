import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Good } from "./types.ts";
import { allDeals } from "./typeDeals";

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
    initializeSales: () => void,
    getTotalRevenue: () => number
}

const getSalesFromDeals = (): salesValues[] => {
    const successfulDeals = allDeals.filter(deal => deal.dealStatus === "successful")

    const soldGoods: salesValues[] = []

    successfulDeals.forEach(deal => {
        deal.clientBuys.forEach((item:Good) => {
            const existingSale = soldGoods.find(sale => sale.id === item.id)

            if (existingSale) {
                existingSale.quantity + item.quantity
                existingSale.sum = item.price * item.quantity
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
} 

const StoreSales = create<salesStore>()(
    persist(
        (set, get) => ({
                values: getSalesFromDeals(),

                initializeSales: () => {
                    set({values: getSalesFromDeals()})
                },
                
                getTotalRevenue: () => {
                    const {values} = get()
                    return values.reduce((sum, item) => sum + item.sum, 0)
                },
            }
        ),
        {name: "all-sales"}
    )
)

export default StoreSales