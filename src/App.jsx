import { Link } from "react-router"
import Header from "./components/header"
import "/src/tailwind.css"

export default function App() {
  return (
    <div>
      <Header />

      <div className="flex justify-around pt-2 pb-2 border-b border-[#aae8ec]">
        <h2>Отчетность</h2>
        <Link to="/report">
        <button className="text-[#252525] bg-[#92ffff] p-1 rounded-md" type="button">Создать отчет</button>
        </Link>
      </div>

      <div className="flex flex-col px-8 pt-8">
        <h2 className="self-start">План продаж</h2>

        <div className="pt-4 border-t border-[#f4ffff]">
          <h3 className="text-[#3e3e3e]">План: (План)</h3>
          <h3 className="text-[#3e3e3e]">Выполнено: (Факт)</h3>
          <h3 className="text-[#3e3e3e]">Осталось: (Факт)</h3>
          <h3 className="text-[#3e3e3e]">Выполнение плана: (Факт)</h3>

        </div>
      </div>
    </div>
  )
}