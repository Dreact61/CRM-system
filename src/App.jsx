import { Link } from "react-router"
import Header from "./components/header"
import "/src/tailwind.css"
import StoreDeals from "./data/typeDeals"
import StoreSales from "./data/typeSales"
import SettingsStore from "./data/typeSettings"
import reportStore from "./data/typeReports"
import { useEffect } from "react"
import { all } from "axios"

export default function App() {
  const { theme, setThemeToDark, setThemeToLight } = SettingsStore()
  const isLight = theme === "light"
  
  const {calculateSum, initDeals, allDeals = [], plan} = StoreDeals()
  const {initReport ,lastReport} = reportStore()
  const {getTotalRevenue, currencyPlan} = StoreSales()

  useEffect(() => {
    initDeals()
    initReport()
  },[])

  const safeDeals = Array.isArray(allDeals) 
  ? allDeals 
  : (allDeals && typeof allDeals === 'object' && Array.isArray(allDeals.deals) ? allDeals.deals : [])

  const completed = safeDeals.filter(deal => deal?.dealStatus !== 'current')
  const current = safeDeals.filter(deal => deal?.dealStatus === 'current')
  const successful = safeDeals.filter(deal => deal?.dealStatus === 'successful')
  const failed = safeDeals.filter(deal => deal?.dealStatus === 'failed')
  const lastDeal = completed[completed.length - 1]

  const dealsStats = [
    { label: "План:", val: plan },
    { label: "Всего совершено сделок:", val: failed.length + successful.length },
    { label: "Успешных сделок:", val: successful.length },
    { label: "Сорвавшихся сделок:", val: failed.length },
    { label: "Незавершенных сделок:", val: current.length },
    { label: "Процентиль успешных сделок:", val: completed.length !== 0 ? `${Math.round(successful.length/(successful.length + failed.length) * 100)}%` : "0"},
  ];

  const progress = getTotalRevenue()
  
  const salesPlanStats = [
    {label: "План", val: currencyPlan},
    {label: "Факт", val: progress},
    {label: "К-т выполнения плана", val: `${Math.round(progress/currencyPlan * 100)}%`}
  ];

  const cardStyles = `flex flex-col px-8 md:px-16 mt-8 pt-2 pb-2 rounded-md border-2 m-auto transition-colors ${
    isLight 
      ? "bg-[#4c7dc7] border-[#88b7ff]" 
      : "bg-[#1f293d] border-[#374151]"
  }`;

  const textStyles = isLight ? "text-[#f4ffff]" : "text-[#d1d5db]";
  const borderStyles = isLight ? "border-[#f4ffff]" : "border-[#374151]";
  
  const buttonStyles = `${textStyles} ${isLight ? "bg-[#499be7]" : "bg-[#3661e9]"} cursor-pointer rounded-md p-1`

  return (
    <div className={`text-[10px] min-h-screen md:text-[14px] flex flex-col h-fit transition-colors ${isLight ? "bg-[#3f649bbe]" : "bg-[#0d1b31be]"}`}>
      <Header />

      <div className={`flex w-full justify-around pt-4 pb-4 border-b transition-colors ${isLight ? "border-[#aae8ec]" : "border-[#4837c2]"}`}>
        <h2>Отчетность</h2>
        <Link to="/report">
          <button type="button" className={`${buttonStyles}`}>
            Создать отчет
          </button>
        </Link>
      </div>

      <div className="flex w-full flex-col md:flex-row md:justify-around">

        <div className="flex flex-col md:w-1/2">

          <div className={`${cardStyles} w-3/4 pt-4 md:w-4/5`}>
                <h2 className="self-start">Основная сводка</h2>

                <div className={`${borderStyles} ${textStyles} border-t pt-2 pb-2`}>
                    {
                        salesPlanStats.map(({label, val}) => (
                            <div key={label} className={`${textStyles} flex flex-row justify-between`}>
                                <h3>{label}</h3>
                                <p>{val}</p>
                            </div>
                        ))
                    }
                </div>
            </div>

          <div className={`${cardStyles} md:4/5 w-3/4`}>
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

          <div className={`${cardStyles} md:w-4/5 w-3/4`}>
            <h2 className="self-start px-2">Базовые настройки</h2>
            <div className="flex flex-col gap-1 mt-2">
              <label className={`${textStyles} ${borderStyles} pt-4 border-t flex justify-between cursor-pointer`} htmlFor="theme-light">
                Светлая тема 
                <input type="radio" id="theme-light" onChange={setThemeToLight} checked={isLight}/>
              </label>
              <label className={`${textStyles} flex justify-between cursor-pointer`} htmlFor="theme-dark">
                Темная тема 
                <input type="radio" id="theme-dark" checked={theme === "dark"} onChange={setThemeToDark}/>
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:w-3/4">
          
          <div className={`${cardStyles} md:w-4/5 w-3/4`}>
            <h2 className="self-start px-2">Последняя отчетность:</h2>
            
            <div className={`border-t border-b pb-4 pt-4 ${borderStyles}`}>
              <h3 className={`${textStyles} flex justify-between`}>Дата сдачи: <p>{lastReport ? lastReport.wasWritten : "(Дата)"}</p></h3>
              <h3 className={`${textStyles} flex justify-between`}>Дата истечения: <p>{lastReport ? lastReport.expiresAt : "(Дата)"}</p></h3>
            </div>

            <div className={`flex flex-col pt-2 md:pt-4 pb-4 md:pb-8 border-b ${borderStyles}`}>
              <h2 className="self-start px-2">Содержание:</h2>
              <p className={textStyles}>{lastReport ? lastReport.report : "(Содержание отчета)"}</p>
            </div>

            <div className="pb-2 pt-4">
              <h3 className={`${textStyles} flex justify-between`}>От: <p>{lastReport ? lastReport.from : "(ФИО)"}</p></h3>
              <h3 className={`${textStyles} flex justify-between`}>Для: <p>{lastReport ? lastReport.to : "(ФИО)"}</p></h3>
            </div>
          </div>

          <div className={`${cardStyles} md:w-4/5 mb-2 w-3/4`}>
            <h2 className="self-start">Последняя совершенная сделка</h2>
            <div className={`pt-4 border-t ${borderStyles}`}>
              {lastDeal ? (
                <div className={`${textStyles}`}>
                  <h3 className="flex flex-row justify-between">Статус: <p>{lastDeal.dealStatus === 'successful' ? "Успешная" : "Провальная"}</p></h3>
                  <h3 className="flex flex-row justify-between">Заказчик: <p>{lastDeal.clientName}</p></h3>
                  <h3 className="flex flex-row justify-between">Эл. почта заказчика: <p>{lastDeal.clientEmail}</p></h3>
                  <h3 className="flex flex-row justify-between">Провел сделку: <p>{lastDeal.dealerName}</p></h3>
                  
                  <div className={`${cardStyles} w-full flex flex-col mt-4`}>
                    <p className={`${textStyles} self-start font-bold`}>Товары:</p>
                    {lastDeal.clientBuys?.map(good => (
                      <div key={good.id} className={`${borderStyles} pt-2 pb-2 border-b flex flex-col`}>
                        <p>{good.name}</p>
                        <b>Цена(шт): {good.price}</b>
                        <i>Кол-во: {good.quantity}</i>
                      </div>
                    ))}
                    <p className="pt-2 font-bold">Итоговая цена: {calculateSum(lastDeal)} руб.</p>
                  </div>
                </div>
              ) : (
                <p className={`${textStyles} pb-1`}>Пока нет совершенных сделок.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
