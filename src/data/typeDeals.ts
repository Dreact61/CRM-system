import { create } from "zustand"
import { persist } from "zustand/middleware"
import employeesData from "./employees.json" with {type:"json"}
import goodsData from "./goods.json" with {type:"json"}
import { Good } from "./goods.ts"

const goodsList = goodsData.goods
const employeesList = employeesData.employees

export type DealValues = {
    clientName: string,
    clientEmail: string,
    clientPhoneNumber: string,
    clientBuys: Good[],
    dealerName: string,
    dealId: number,
    dealStatus: "current" | "successful" | "failed",
}

export const allDeals: DealValues[] = [
    {
      dealId: 101,
      clientName: "ООО 'ТехноРешения'",
      clientEmail: "zakaz@technoresh.ru",
      clientPhoneNumber: "+7 999 111-22-33",
      clientBuys: [
        goodsList[3],
        goodsList[8]
      ],
      dealerName: `${employeesList[0].name}  ${employeesList[0].lastName}`,
      dealStatus: "successful"
    },
    {
      dealId: 102,
      clientName: "Михаил Петров",
      clientEmail: "petrov.m@fakemail.ru",
      clientPhoneNumber: "+7 915 444-55-66",
      clientBuys: [
        goodsList[2],
        goodsList[5]
      ],
      dealerName: `${employeesList[4].name}  ${employeesList[4].lastName}`,
      dealStatus: "current"
    },
    {
      dealId: 103,
      clientName: "ИП Сидоров А.В.",
      clientEmail: "sidorov_design@yandex.ru",
      clientPhoneNumber: "+7 903 777-88-99",
      clientBuys: [
        goodsList[13]
      ],
      dealerName: `${employeesList[7].name}  ${employeesList[7].lastName}`,
      dealStatus: "failed"
    },
    {
      dealId: 104,
      clientName: "Стартап 'ГеймДев Лаб'",
      clientEmail: "hr@fakegamedevlab.io",
      clientPhoneNumber: "+7 999 555-44-33",
      clientBuys: [
        goodsList[4],
        goodsList[9]
      ],
      dealerName: `${employeesList[0].name}  ${employeesList[0].lastName}`,
      dealStatus: "current"
    },
    {
      dealId: 105,
      clientName: "Екатерина Смирнова",
      clientEmail: "katerina.sm@fakemail.com",
      clientPhoneNumber: "+7 926 333-22-11",
      clientBuys: [
        goodsList[7],
        goodsList[11]
      ],
      dealerName: `${employeesList[8].name}  ${employeesList[8].lastName}`,
      dealStatus: "successful"
    },
    {
      dealId: 106,
      clientName: "АО 'АйТи Корп'",
      clientEmail: "procurement@itcorp.ru",
      clientPhoneNumber: "+7 495 123-45-67",
      clientBuys: [
        goodsList[6],
        goodsList[16]
      ],
      dealerName: `${employeesList[2].name}  ${employeesList[2].lastName}`,
      dealStatus: "current"
    }
  ];
  

export type StoreType = {
    deals: DealValues[],
    calculateSum: (deal: DealValues) => number
} 

const StoreDeals = create<StoreType>()(
    persist(
        () => ({
            deals: allDeals,

            calculateSum: (deal) => {
                return deal.clientBuys.reduce((sum, item) => {
                    return sum + (item.price * item.quantity)
                }, 0)
            }
        }),
        {name: "all-deals"}
    )
)

export default StoreDeals