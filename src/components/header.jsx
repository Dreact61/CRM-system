import "/src/tailwind.css"
import { Link, useLocation } from "react-router"
import SettingsStore from "../data/typeSettings"

const navLinks = [
  { to: "/", label: "Главная" },
  { to: "/deals", label: "Сделки" },
  { to: "/sales", label: "Продажи" },
  { to: "/analytics", label: "Аналитика" },
];

export default function Header() {
    const { theme } = SettingsStore()
    const isLight = theme === "light"
    const location = useLocation()

    return (
        <header 
          className={`z-900 top-0 sticky md:flex md:flex-row grid grid-cols-3 w-full gap-2 justify-around pt-2 pb-4 border-b rounded-md md:justify-start md:gap-16 md:pl-4 ${
            isLight 
              ? "bg-[#e2fff3]" 
              : "bg-[#092030] text-[#092030]"
          }`}
        >
            {navLinks.map(({ to, label }) => {
                const isActive = location.pathname === to;

                return (
                    <Link key={to} to={to}>
                        <button
                            type="button"
                            className={`border-b px-2 pb-2 text-[14px] cursor-pointer transition-colors ${
                                isActive 
                                    ? "border-[#499be7] text-[#499be7]" 
                                    : "border-[#3676a1] text-[#3676a1]"
                            }`}
                        >
                            {label}
                        </button>
                    </Link>
                );
            })}
        </header>
    )
}
