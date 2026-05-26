import "/src/tailwind.css"
import { Link, useLocation } from "react-router"

export default function Header() {
    const location = useLocation()


    return (
        <div className="md:justify-start md:gap-16 md:pl-4 flex rounded-md w-full mt-1 gap-2 justify-around pt-2 border-b pb-4 bg-[#e2fff3]">
            <Link to="/">
            <button style={{borderColor: location.pathname === "/" ? "#499be7" : "#3e3e3e",color: location.pathname === "/" ? "#499be7" : "#3e3e3e",fontSize: "14px"}} type="button" className="border-b px-2 pb-2 cursor-pointer">Главная</button>
            </Link>
            <Link to="/sales">
            <button style={{borderColor: location.pathname === "/sales" ? "#499be7" : "#3e3e3e",color: location.pathname === "/sales" ? "#499be7" : "#3e3e3e",fontSize: "14px"}} type="button" className="border-b px-2 pb-2 cursor-pointer">Продажи</button>
            </Link>
            <Link to="/analytics">
            <button style={{borderColor: location.pathname === "/analytics" ? "#499be7" : "#3e3e3e",color: location.pathname === "/analytics" ? "#499be7" : "#3e3e3e",fontSize: "14px"}} type="button" className="border-b px-2 pb-2 cursor-pointer">Аналитика</button>
            </Link>
            <Link to="/orders">
            <button style={{borderColor: location.pathname === "/orders" ? "#499be7" : "#3e3e3e",color: location.pathname === "/orders" ? "#499be7" : "#3e3e3e",fontSize: "14px"}} type="button" className="border-b px-2 pb-2 cursor-pointer">Заказы</button>
            </Link>
            <Link to="/settings">
            <button style={{borderColor: location.pathname === "/settings" ? "#499be7" : "#3e3e3e", color: location.pathname === "/settings" ? "#499be7" : "#3e3e3e",fontSize: "14px"}} type="button" className="border-b px-2 pb-2 cursor-pointer">Настройки</button>
            </Link>
        </div>
    )
}