import { create } from "zustand"
import axios from "axios"
import { Deal, Employee, Good, Item } from "./types.ts"

const API_URL = `http://localhost:5000/api/deals`
const API_URL_EMPLOYEES = `http://localhost:5000/api/employees`
const API_URL_GOODS = `http://localhost:5000/api/goods`

type Response = {
    deals: Deal[],
    items: Item[]
}

export type StoreType = {
    allDeals: Deal[],
    allEmployees: Employee[]
    plan: number,
    loading: boolean,
    error: string | null
    initDeals: () => Promise<void>,
    calculateSum: (deal: Deal) => number,
} 

const StoreDeals = create<StoreType>()(
        (set) => ({
            allDeals: [],
            allEmployees: [],
            plan: 7,
            loading: false,
            error: null,

            initDeals: async () => {
                try {
                    set({loading: true, error: null})

                    const res = await axios.get<Response>(API_URL)
                    const employees = await axios.get<Employee[]>(API_URL_EMPLOYEES)
                    const deals = res.data.deals
                    const items = res.data.items
                    const employeesRes = employees.data

                    const goodsRes = await axios.get<Good[]>(API_URL_GOODS)
                    const goods = goodsRes.data
                    
                    // console.log(goods)
                    const mutatedItems = items.map(item => {
                        const good = goods.find(g => g.id === item.good_id)

                        return {
                            id: item.good_id,
                            good_id: item.good_id,
                            name: good?.name || "Unknown",
                            description: good?.description || '',
                            price: good?.price,
                            quantity: item.quantity || 0,
                            deal_id: item.deal_id
                        }
                    })

                    const completedDeals:Deal[] = deals.map(deal => {
                        const employee = employeesRes.find(e => e.id === deal.dealer_id)

                        return {
                        id: deal.id,
                        client_name:deal.client_name,
                        client_email:deal.client_email,
                        client_phone:deal.client_phone,
                        client_buys: mutatedItems.filter(item => item.deal_id === deal.id),
                        dealer_name: `${employee?.name} ${employee?.last_name}`,
                        deal_status: deal.deal_status
                    }})

                    set({
                        allDeals: completedDeals,
                        allEmployees: employeesRes,
                        loading: false
                    })
                    // console.log(completedDeals)
                } catch(err:any) {
                   console.error(`Error: ${err.message}`)
                   set({error: err.message, loading: false})
                }
            },

            calculateSum: (deal) => {
              if (!deal || !deal.client_buys || !Array.isArray(deal.client_buys)) return 0

                return deal.client_buys.reduce((sum, item:Item) => {
                    const price = item?.price
                    const quantity = item?.quantity
                    if (price && quantity) {
                        return sum + (price * quantity)
                    } else {
                        return 0
                    }
                }, 0)
            }
        })
)

export default StoreDeals