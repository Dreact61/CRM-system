import { Link } from "react-router"
import Header from "./components/header"
import "/src/tailwind.css"
import SettingsStore from "./data/typeSettings"
import { allDeals } from "./data/typeDeals"
import StoreSales from "./data/typeSales"
import StoreDeals from "./data/typeDeals"
import { useEffect, useState } from "react"

const API_URL = `http://localhost:5000/deals`

export default function App() {
  const { theme, setThemeToDark, setThemeToLight } = SettingsStore()
  const isLight = theme === "light"
  const {calculateSum} = StoreDeals()

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const res = await fetch(`${API_URL}`)

        if (!res.ok) throw new Error(`${res.status}`)

        const data = await res.json()
        setData(data)
      } catch(e) {
        console.error(e)
        setError(e)
        return null
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  
  const successful = (allDeals.filter(deal => deal.dealStatus === "successful")).length
  const failed = (allDeals.filter(deal => deal.dealStatus === "failed")).length
  const current = (allDeals.filter(deal => deal.dealStatus === "current")).length

  const notCurrent = allDeals.filter(deal => deal.dealStatus !== 'current')
  const lastDeal = notCurrent[notCurrent.length - 1]
  
  const dealsStats = [
    { label: "План:", val: "7" },
    { label: "Всего совершено сделок:", val: failed + successful },
    { label: "Успешных сделок:", val: successful },
    { label: "Сорвавшихся сделок:", val: failed },
    { label: "Незавершенных сделок:", val: current },
    { label: "Процентиль успешных сделок:", val: `${Math.round(successful/(successful + failed) * 100)}%` },
  ];

  const {getTotalRevenue} = StoreSales()
  
  const plan = 800000
  const progress = getTotalRevenue()
  
  const salesPlanStats = [
    {label: "План", val: plan},
    {label: "Факт", val: progress},
    {label: "К-т выполнения плана", val: `${Math.round(progress/plan * 100)}%`}
  ];

  const cardStyles = `flex flex-col px-8 md:px-16 mt-8 pt-2 pb-2 rounded-md border-2 m-auto transition-colors ${
    isLight 
      ? "bg-[#4c7dc7] border-[#88b7ff]" 
      : "bg-[#1f293d] border-[#374151]"
  }`;

  const textStyles = isLight ? "text-[#f4ffff]" : "text-[#d1d5db]";
  const borderStyles = isLight ? "border-[#f4ffff]" : "border-[#374151]";
  
  const buttonStyles = `${textStyles} ${isLight ? "bg-[#499be7]" : "bg-[#3661e9]"} cursor-pointer rounded-md p-1`

  if (loading) return <div>Loading...</div>
  if (error) return <h1 className="text-[#ad260e]">Error {error.message}</h1>
  return (
    <div className={`flex flex-col h-fit transition-colors ${isLight ? "bg-[#3f649bbe]" : "bg-[#0d1b31be]"}`}>
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
                            <div key={val} className={`${textStyles} flex flex-row justify-between`}>
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
              <h3 className={`${textStyles} flex justify-between`}>Дата сдачи: <p>(Дата)</p></h3>
              <h3 className={`${textStyles} flex justify-between`}>Временной промежуток: <p>(Дата) - (Дата)</p></h3>
            </div>

            <div className={`flex flex-col pt-2 md:pt-4 pb-4 md:pb-8 border-b ${borderStyles}`}>
              <h2 className="self-start px-2">Содержание:</h2>
              <p className={textStyles}>(Содержание отчета)</p>
            </div>

            <div className="pb-2 pt-4">
              <h3 className={`${textStyles} flex justify-between`}>От: <p>(ФИО)</p></h3>
              <h3 className={`${textStyles} flex justify-between`}>Для: <p>(ФИО)</p></h3>
            </div>
          </div>

          <div className={`${cardStyles} md:w-4/5 mb-2 w-3/4`}>
            <h2 className="self-start">Последняя совершенная сделка</h2>
            <div className={`pt-4 border-t ${borderStyles}`}>
              {lastDeal 
              ? <div className={`${textStyles}`}>
                  <h3 className={`${borderStyles} flex flex-row justify-between`}>Статус: <p>{lastDeal.dealStatus === 'successful' ? "Успешная" : "Провальная"}</p></h3>
                  <h3 className={`${borderStyles} flex flex-row justify-between`}>Заказчик: <p>{lastDeal.clientName}</p></h3>
                  <h3 className={`${borderStyles} flex flex-row justify-between`}>Эл. почта заказчика: <p>{lastDeal.clientEmail}</p></h3>
                  <h3 className={`${borderStyles} flex flex-row justify-between`}>Провел сделку: <p>{lastDeal.dealerName}</p></h3>
                  <ul className={`${cardStyles} w-full flex flex-col`}>
                    <p className={`${textStyles} self-start font-bold`}>Товары:</p>
                    {lastDeal.clientBuys.map(good => (
                      <li key={good.id} className={`${borderStyles} pt-2 pb-2 border-b flex flex-col`}>
                        <p>{good.name}</p>
                        <b>Цена(шт): {good.price}</b>
                        <i>Кол-во: {good.quantity}</i>
                      </li>
                    ))}
                    <p className="pt-2">Итоговая цена: {calculateSum(lastDeal)}руб.</p>
                  </ul>
                </div>
              : <p className={`${textStyles} pb-1`}>Пока нет совершенных сделок.</p>}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
