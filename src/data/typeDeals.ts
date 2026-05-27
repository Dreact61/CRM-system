import { create } from "zustand";
import { persist } from "zustand/middleware";
import employees from "./Employees";
import { goods, Good } from "./goods";

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
        goods[3],
        goods[8]
      ],
      dealerName: `${employees[0].name}  ${employees[0].lastName}`,
      dealStatus: "successful"
    },
    {
      dealId: 102,
      clientName: "Михаил Петров",
      clientEmail: "petrov.m@fakemail.ru",
      clientPhoneNumber: "+7 915 444-55-66",
      clientBuys: [
        goods[2],
        goods[5]
      ],
      dealerName: `${employees[4].name}  ${employees[4].lastName}`,
      dealStatus: "current"
    },
    {
      dealId: 103,
      clientName: "ИП Сидоров А.В.",
      clientEmail: "sidorov_design@yandex.ru",
      clientPhoneNumber: "+7 903 777-88-99",
      clientBuys: [
        goods[13]
      ],
      dealerName: `${employees[7].name}  ${employees[7].lastName}`,
      dealStatus: "failed"
    },
    {
      dealId: 104,
      clientName: "Стартап 'ГеймДев Лаб'",
      clientEmail: "hr@fakegamedevlab.io",
      clientPhoneNumber: "+7 999 555-44-33",
      clientBuys: [
        goods[4],
        goods[9]
      ],
      dealerName: `${employees[0].name}  ${employees[0].lastName}`,
      dealStatus: "current"
    },
    {
      dealId: 105,
      clientName: "Екатерина Смирнова",
      clientEmail: "katerina.sm@fakemail.com",
      clientPhoneNumber: "+7 926 333-22-11",
      clientBuys: [
        goods[7],
        goods[11]
      ],
      dealerName: `${employees[8].name}  ${employees[8].lastName}`,
      dealStatus: "successful"
    },
    {
      dealId: 106,
      clientName: "АО 'АйТи Корп'",
      clientEmail: "procurement@itcorp.ru",
      clientPhoneNumber: "+7 495 123-45-67",
      clientBuys: [
        goods[6],
        goods[16]
      ],
      dealerName: `${employees[2].name}  ${employees[2].lastName}`,
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