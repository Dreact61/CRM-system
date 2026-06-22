import { create } from "zustand";
import { Deal, Item, Good } from "./types.ts";
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
    clientName: any
}

type Response = {
    deals: Deal[],
    items: Item[],
}

export type salesStore = {
    all_Deals: Deal[],
    allSales: salesValues[],
    totalRevenue: number,
    currencyPlan: number,
    error: string | null,
    loading: boolean,
    initializeSales: () => Promise<void>,
    getTotalRevenue: () => number
}

const StoreSales = create<salesStore>()(
    (set, get) => ({
        all_Deals: [],
        allSales: [],
        totalRevenue: 0,
        currencyPlan: 800000,
        error: null,
        loading: false,

        initializeSales: async () => {
            try {
                set({ loading: true, error: null })

                const dealsRes = await axios.get<Response>(DEALS)
                const goodsRes = await axios.get<Good[]>(GOODS)


                const goods = goodsRes.data
                const deals:Deal[] = dealsRes.data.deals
                const items:Item[] = dealsRes.data.items

                const successfulDeals = deals.filter(deal => deal.deal_status === 'successful')
                const successfulDealsIDs = new Set(successfulDeals.map(d => d.id))
                const purchasedItems = Array.isArray(items) ? items: []
                
                const soldGoods: salesValues[] = []

                purchasedItems.forEach(item => {
                    if (!successfulDealsIDs.has(item.deal_id)) return

                    const targetGoodId = item.good_id

                    const existingSale = soldGoods.find(sale => sale.id === targetGoodId)
                    const Price = goods.find(good => good.id === targetGoodId)?.price
                    const Quantity = item.quantity
                    const Sum = (Price || 0) * (Quantity || 0)
                    console.log(Price)
                    
                    const foundGood = goods.find(good => good.id === targetGoodId)
                    const Name = foundGood?.name
                    const Desc = foundGood?.description
                    
                    if (existingSale) {
                        existingSale.quantity += Quantity || 0
                        existingSale.sum += Sum || 0
                    } else {
                        soldGoods.push({
                            name: Name || 'Unknown',
                            id: targetGoodId,
                            price: Price || 0,
                            desc: Desc || '',
                            quantity: Quantity || 0,
                            sum: Sum,
                            clientName: successfulDeals.find(d => d.id === item.deal_id)?.client_name
                        })
                    }
                })

                const total = soldGoods.reduce((sum, item) => sum + item.sum, 0)

                set({
                    all_Deals: deals,
                    allSales: soldGoods,
                    totalRevenue: total,
                    loading: false
                })
            } catch (err: any) {
                console.error(`Error: ${err.message}`)
                set({ error: err.message, loading: false, all_Deals: [], allSales: [], totalRevenue: 0 })
            }
        },

        getTotalRevenue: () => {
            const { allSales } = get()
            return allSales.reduce((sum, item) => sum + item.sum, 0)
        }
    }
    )
)

export default StoreSales