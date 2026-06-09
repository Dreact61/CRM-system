import Header from "./header";
import SettingsStore from "../data/typeSettings";
import StoreDeals from "../data/typeDeals"
import { useEffect } from "react";


export default function Deals() {
    const {theme} = SettingsStore()
    const {calculateSum, initDeals, allDeals} = StoreDeals()

    useEffect(() => {
        initDeals()
    }, [])

    const dealsArr = Array(allDeals)

    const completed = dealsArr.filter(deal => deal.dealStatus !== 'current')
    const current = dealsArr.filter(deal => deal.dealStatus === 'current')
    const successful = dealsArr.filter(deal => deal.dealStatus === 'successful')
    const failed = dealsArr.filter(deal => deal.dealStatus === 'failed')
    const lastDeal = completed[completed.length - 1]
    
    const dealsStats = [
        { label: "План:", val: "7" },
        { label: "Всего совершено сделок:", val: failed + successful },
        { label: "Успешных сделок:", val: successful },
        { label: "Сорвавшихся сделок:", val: failed },
        { label: "Незавершенных сделок:", val: current },
        { label: "Процентиль успешных сделок:", val: `${Math.round(successful/(successful + failed) * 100)}%` },
      ];
    const isLight = theme === "light"

    const cardStyles = `flex flex-col px-8 mt-8 pt-2 pb-2 rounded-md border-2 m-auto transition-colors ${
      isLight 
        ? "bg-[#4c7dc7] border-[#88b7ff]" 
        : "bg-[#1f293d] border-[#374151]"
    }`;
  
    const textStyles = isLight ? "text-[#f4ffff]" : "text-[#d1d5db]";
    const borderStyles = isLight ? "border-[#f4ffff]" : "border-[#374151]";

    return (
        <div className={`text-[10px] md:text-[14px] flex flex-col h-fit transition-colors ${isLight ? "bg-[#3f649bbe]" : "bg-[#0d1b31be]"}`}>
            <Header />

        <div className={`${cardStyles} md:w-9/10 w-3/5`}>
            <h2 className="self-start">Сделки</h2>
            <div className={`pt-4 border-t ${borderStyles}`}>
              {dealsStats.map(({ label, val }) => (
                <div key={label} className={`${textStyles} flex justify-between`}>
                  <h3>{label}</h3>
                  <p>{val}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex md:flex-row flex-col">
            <div className={`${cardStyles} ${borderStyles} ${textStyles} md:w-2/5 m-auto w-3/5 border-t gap-2 pt-1 pb-2`}>
                        <h2>Завершенные сделки</h2>
                        {completed && completed.length !== 0
                        ? completed.map(deal => (
                            <div style={{fontSize:"14px"}} key={deal.dealId} className={`${borderStyles} flex flex-col pb-2 pt-1 border-b gap-2 justify-between`}>
                                <h3 className={`${textStyles} flex flex-row justify-between`}>Заказчик: <p>{deal.clientName}</p></h3>
                                <h3 className={`${textStyles} flex flex-row justify-between`}>Эл.почта заказчика: <p>{deal.clientEmail}</p></h3>
                                <h3 className={`${textStyles} flex flex-row justify-between`}>Номер телефона заказчика: <p>{deal.clientPhoneNumber}</p></h3>
                                <ul className={`${cardStyles} w-full flex flex-col`}>
                                    <p className={`${textStyles} self-start font-bold`}>Товары:</p>
                                    {deal.clientBuys.map(good => (
                                        <li key={good.id} className={`${borderStyles} pt-2 pb-2 border-b flex flex-col`}>
                                            <p>{good.name}</p>
                                            <b>Цена(шт): {good.price}</b>
                                            <i>Кол-во: {good.quantity}</i>
                                        </li>
                                    ))}
                                    <p className="pt-2">Итоговая цена: {calculateSum(deal)}руб.</p>
                                </ul>
                                <h3 className={`${textStyles} flex flex-row justify-between`}>Провел сделку: <p>{deal.dealerName}</p></h3>
                                <h3 className={`${textStyles} flex flex-row justify-between`}>Статус сделки: <p>{deal.dealStatus === "successful" ? "Успешная" : "Провальная"}</p></h3>
                            </div>
                        ))
                        : <p>Завершенных сделок пока нет.</p>
                        }
                    </div>

            <div className={`${cardStyles} ${borderStyles} ${textStyles} md:w-2/5 m-auto w-3/5 border-t gap-2 pt-1 pb-2`}>
                        <h2>Незавершенные сделки</h2>
                        
                        {current && current.length !== 0
                        ? current.map(deal => (
                            <div style={{fontSize:"14px"}} key={deal.dealId} className={`${borderStyles} flex flex-col pb-2 pt-1 border-b gap-2 justify-between`}>
                                <h3 className={`${textStyles} flex flex-row justify-between`}>Заказчик: <p>{deal.clientName}</p></h3>
                                <h3 className={`${textStyles} flex flex-row justify-between`}>Эл.почта заказчика: <p>{deal.clientEmail}</p></h3>
                                <h3 className={`${textStyles} flex flex-row justify-between`}>Номер телефона заказчика: <p>{deal.clientPhoneNumber}</p></h3>
                                <ul className={`${cardStyles} w-full flex flex-col`}>
                                    <p className={`${textStyles} self-start font-bold`}>Товары:</p>
                                    {deal.clientBuys.map(good => (
                                        <li key={good.id} className={`${borderStyles} pt-2 pb-2 border-b flex flex-col`}>
                                            <p>{good.name}</p>
                                            <b>Цена(шт): {good.price}</b>
                                            <i>Кол-во: {good.quantity}</i>
                                        </li>
                                    ))}
                                    <p className="pt-2">Итоговая цена: {calculateSum(deal)}руб.</p>
                                </ul>
                                <h3 className={`${textStyles} flex flex-row justify-between`}>Провел сделку: <p>{deal.dealerName}</p></h3>
                                <h3 className={`${textStyles} flex flex-row justify-between`}>Статус сделки: <p>В процессе</p></h3>
                            </div>
                        ))
                        : <p>Нет активных сделок.</p>
                        }
                    </div>
          </div>
          
        </div>
    )
}