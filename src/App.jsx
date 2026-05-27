import { Link } from "react-router"
import Header from "./components/header"
import "/src/tailwind.css"
import SettingsStore from "./data/typeSettings"
import { allDeals } from "./data/typeDeals"

const salesPlanStats = [
  { label: "План:", val: "(План)" },
  { label: "Выполнено:", val: "(Факт)" },
  { label: "Осталось:", val: "(Факт)" },
  { label: "Выполнение плана:", val: "(Факт)" },
];

const successful = (allDeals.filter(deal => deal.dealStatus === "successful")).length
const failed = (allDeals.filter(deal => deal.dealStatus === "failed")).length
const current = (allDeals.filter(deal => deal.dealStatus === "current")).length

const dealsStats = [
  { label: "План:", val: "10" },
  { label: "Всего совершено сделок:", val: failed + successful },
  { label: "Успешных сделок:", val: successful },
  { label: "Сорвавшихся сделок:", val: failed },
  { label: "Незавершенных сделок:", val: current },
  { label: "Процентиль успешных сделок:", val: `${Math.round(successful/(successful + failed) * 100)}%` },
];

export default function App() {
  const { theme, setThemeToDark, setThemeToLight } = SettingsStore()
  const isLight = theme === "light"

  const cardStyles = `flex flex-col px-8 mt-8 pt-2 pb-2 rounded-md border-2 m-auto transition-colors ${
    isLight 
      ? "bg-[#4c7dc7] border-[#88b7ff]" 
      : "bg-[#1f293d] border-[#374151]"
  }`;

  const textStyles = isLight ? "text-[#f4ffff]" : "text-[#d1d5db]";
  const borderStyles = isLight ? "border-[#f4ffff]" : "border-[#374151]";
  
  const buttonStyles = `${textStyles} ${isLight ? "bg-[#499be7]" : "bg-[#3661e9]"} cursor-pointer rounded-md p-1`

  return (
    <div className={`flex flex-col md:h-screen h-fit transition-colors ${isLight ? "bg-[#3f649bbe]" : "bg-[#0d1b31be]"}`}>
      <Header />

      <div className={`flex justify-around pt-4 pb-4 border-b transition-colors ${isLight ? "border-[#aae8ec]" : "border-[#4837c2]"}`}>
        <h2>Отчетность</h2>
        <Link to="/report">
          <button type="button" className={`${buttonStyles}`}>
            Создать отчет
          </button>
        </Link>
      </div>

      <div className="flex w-full flex-col md:flex-row md:justify-around">

        <div className="flex flex-col md:w-1/2">

          <div className={`${cardStyles} md:w-100 w-120`}>
            <h2 className="self-start">План продаж</h2>
            <div className={`pt-4 border-t ${borderStyles}`}>
              {salesPlanStats.map(({ label, val }) => (
                <div key={label} className={`${textStyles} flex justify-between`}>
                  <h3>{label}</h3>
                  <p>{val}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`${cardStyles} md:w-100 w-120`}>
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

          <div className={`${cardStyles} md:w-100 w-120`}>
            <h2 className="self-start">Последняя совершенная сделка</h2>
            <div className={`pt-4 border-t ${borderStyles}`}>
              <p className={`${textStyles} pb-1`}>Пока нет совершенных сделок.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:w-3/4">
          
          <div className={`${cardStyles} md:w-3/4 md:mr-24 w-120`}>
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

          <div className={`${cardStyles} md:w-3/4 md:mr-24 w-120`}>
            <h2 className="self-start px-2">Базовые настройки</h2>
            <div className="flex flex-col gap-1 mt-2">
              <label className={`${textStyles} flex justify-between cursor-pointer`} htmlFor="theme-light">
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
      </div>
    </div>
  )
}
