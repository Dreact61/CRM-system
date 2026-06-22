import Header from "./header"
import SettingsStore from "../stores/typeSettings"
import StoreSales from "../stores/typeSales"
import { useEffect } from "react"

export default function Sales() {
    const {allSales, currencyPlan, totalRevenue, initializeSales} = StoreSales()

    useEffect(() => {
        initializeSales()
    }, [])

    const { theme } = SettingsStore()
    const isLight = theme === "light"

    const plan = currencyPlan
    const progress = totalRevenue

    const salesMainInfo = [
        {label: "План", val: plan},
        {label: "Факт", val: progress},
        {label: "К-т выполнения плана", val: plan > 0 ? `${Math.round(progress/plan * 100)}%` : 0}
    ]
  
    const cardStyles = `flex flex-col px-8 mt-8 pt-2 pb-2 rounded-md border-2 m-auto transition-colors ${
      isLight 
        ? "bg-[#4c7dc7] border-[#88b7ff]" 
        : "bg-[#1f293d] border-[#374151]"
    }`;
  
    const textStyles = isLight ? "text-[#f4ffff] text-[10px] md:text-[14px]" : "text-[#d1d5db] text-[10px] md:text-[14px]";
    const borderStyles = isLight ? "border-[#f4ffff]" : "border-[#374151]";

    return (
        <div className={`text-[10px] min-h-screen md:text-[14px] flex flex-col h-fit transition-colors ${isLight ? "bg-[#3f649bbe]" : "bg-[#0d1b31be]"}`}>
            <Header />
            <h3 className={`${textStyles} pt-4 text-3xl`}>Продажи</h3>

            <div className={`${cardStyles} ${textStyles} w-3/4 pt-4 md:w-2/5`}>
                <h2 className="self-start">Основная сводка</h2>

                <div className={`${borderStyles} ${textStyles} border-t pt-2 pb-2`}>
                    {
                        salesMainInfo.map(({label, val}) => (
                            <div key={val} className={`${textStyles} flex flex-row justify-between`}>
                                <h3>{label}</h3>
                                <p>{val}</p>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className={`${cardStyles} w-3/4 pt-4 md:w-2/5 mb-4`}>
                <h2 className="self-start">История продаж</h2>

                <div className={`${borderStyles} ${textStyles} border-t gap-2 pt-1 pb-2`}>
                    {allSales && allSales.length !== 0
                    ? allSales.map(sale => (
                        <div style={{fontSize:"14px"}} key={sale.id} className={`${borderStyles} ${textStyles} flex flex-col pb-2 pt-1 border-b gap-2 justify-between`}>
                            <h3 className={`${textStyles} flex flex-row justify-between`}>Заказчик: <p>{sale.clientName}</p></h3>
                            <h3 className={`${textStyles} flex flex-row justify-between`}>Наименование товара: <p>{sale.name}</p></h3>
                            <h3 className={`${textStyles} flex flex-row justify-between`}>Кол-во товара: <p>{sale.quantity}</p></h3>
                            <h3 className={`${textStyles} flex flex-row justify-between`}>Общая сумма: <p>{sale.sum}</p></h3>
                        </div>
                    ))
                    : <p>Продаж пока нет.</p>
                    }
                </div>
            </div>
        </div>
    )
}