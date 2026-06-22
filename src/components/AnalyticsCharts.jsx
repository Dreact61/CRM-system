import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";
import { useEffect } from "react";
import SettingsStore from "../stores/typeSettings";
import StoreSales from "../stores/typeSales"; 

export default function AnalyticsChart() {
  const { theme } = SettingsStore();
  const { all_Deals, allSales, initializeSales, currencyPlan, totalRevenue } = StoreSales();
  const isLight = theme === "light";

  useEffect(() => {
      initializeSales();
  }, [initializeSales]);

  const currentMonthName = "Май"; 
  
  const totalSumData = [
      { month: "Янв", "План по выручке": 1900000, "Факт по выручке": 2113045 },
      { month: "Фев", "План по выручке": 2000000, "Факт по выручке": 1834689 },
      { month: "Мар", "План по выручке": 1400000, "Факт по выручке": 1019942 },
      { month: "Апр", "План по выручке": 1000000, "Факт по выручке": 1178234 },
      { month: currentMonthName, "План по выручке": currencyPlan, "Факт по выручке": totalRevenue },
  ];

  const successfulDealsCount = all_Deals.filter(d => d.deal_status === 'successful').length;

  const totalDealData = [
      { month: "Янв", "План по сделкам": 12, "Факт по сделкам": 14 },
      { month: "Фев", "План по сделкам": 13, "Факт по сделкам": 11 },
      { month: "Мар", "План по сделкам": 10, "Факт по сделкам": 9 },
      { month: "Апр", "План по сделкам": 8, "Факт по сделкам": 9 },
      { month: currentMonthName, "План по сделкам": 7, "Факт по сделкам": successfulDealsCount || 3 },
  ];

  const topSeller = allSales.length > 0 
      ? allSales.reduce((max, item) => item.sum > max.sum ? item : max, allSales[0])
      : null;

  const strokeColor = isLight ? "#3e3e3e" : "#d1d5db";
  const gridColor = isLight ? "#e5e7eb" : "#374151";
  const tooltipBg = isLight ? "#ffffff" : "#1f293d";
  const tooltipTextColor = isLight ? "#000000" : "#ffffff";

  const cardStyles = `flex flex-col px-8 md:mt-0 mt-8 pt-2 pb-2 rounded-md border-2 m-auto transition-colors ${
      isLight ? "bg-[#4c7dc7] border-[#88b7ff]" : "bg-[#1f293d] border-[#374151]"
  }`;
  
  const textStyles = isLight ? "text-[#f4ffff]" : "text-[#d1d5db]";
  const borderStyles = isLight ? "border-[#f4ffff]" : "border-[#374151]";

  const revenueProgressPercent = currencyPlan > 0 ? Math.round((totalRevenue / currencyPlan) * 100) : 0;
  const dealsProgressPercent = Math.round(( (successfulDealsCount || 3) / 7) * 100);

  return (
    <div className="m-auto md:w-3/4 w-full h-fit flex flex-col md:gap-6 p-4 md:p-61">

      <div className="flex flex-col md:flex-row gap-6 w-full justify-start items-start">
          <div className={`p-5 w-full md:w-1/2 rounded-md border-2 transition-colors ${
            isLight ? "bg-white border-[#88b7ff]" : "bg-[#1f293d] border-[#374151]"
          }`}>
              <h3 className={`text-lg font-bold mb-4 ${isLight ? "text-black" : "text-white"}`}>
                Динамика выручки
              </h3>
              <ResponsiveContainer width="100%" height={320}>
                  <LineChart data={totalSumData} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis dataKey="month" stroke={strokeColor} />
                    <YAxis stroke={strokeColor} />
                    <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderRadius: '6px', color: tooltipTextColor, borderColor: gridColor }} />
                    <Legend />
                    <Line type="monotone" dataKey="План по выручке" stroke="#499be7" strokeWidth={2.5} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="Факт по выручке" stroke="#10b981" strokeWidth={2.5} activeDot={{ r: 6 }} />
                  </LineChart>
              </ResponsiveContainer>
          </div>
  
          <div className={`p-5 w-full md:w-1/2 rounded-md border-2 transition-colors ${
            isLight ? "bg-white border-[#88b7ff]" : "bg-[#1f293d] border-[#374151]"
          }`}>
              <h3 className={`text-lg font-bold mb-4 ${isLight ? "text-black" : "text-white"}`}>
                Количество сделок
              </h3>
              <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={totalDealData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis dataKey="month" stroke={strokeColor} />
                    <YAxis stroke={strokeColor} />
                    <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderRadius: '6px', color: tooltipTextColor, borderColor: gridColor }} />
                    <Legend />
                    <Bar dataKey="План по сделкам" fill="#499be7" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Факт по сделкам" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
              </ResponsiveContainer>
          </div>
      </div>

      <div className={`${cardStyles} w-full`}>
          <h2 className={`${textStyles} font-bold text-xl mb-2`}>Полная аналитика</h2>

          <div className={`${borderStyles} ${textStyles} px-4 md:px-16 flex flex-col border-t pt-2`}>
              <h2 className="self-start font-semibold text-lg">План за текущий месяц ({currentMonthName})</h2>
              
              <div className={`${borderStyles} border-t border-b flex flex-col pt-2 pb-2 gap-1`}>
                  <h3 className="flex flex-row justify-between">Изначальный план по выручке: <p className="font-bold">{currencyPlan.toLocaleString()} руб.</p></h3>
                  <h3 className="flex flex-row justify-between">Нынешний результат (Факт): <p className="font-bold">{totalRevenue.toLocaleString()} руб.</p></h3>
                  <h3 className="flex flex-row justify-between">План выполнен на: <p className="font-bold text-[#10b981]">{revenueProgressPercent}%</p></h3>
              </div>
              
              <div className={`${borderStyles} border-b flex flex-col pt-2 pb-2 gap-1`}>
                  <h3 className="flex flex-row justify-between">Сделок запланировано: <p className="font-bold">7 шт.</p></h3>
                  <h3 className="flex flex-row justify-between">Сделок совершено: <p className="font-bold">{successfulDealsCount || 3} шт.</p></h3>
                  <h3 className="flex flex-row justify-between">План по сделкам выполнен на: <p className="font-bold text-[#10b981]">{dealsProgressPercent}%</p></h3>
              </div>
          </div>

          <div className={`${borderStyles} ${textStyles} px-4 md:px-16 flex flex-col pt-2 pb-4`}>
              <h2 className="self-start font-semibold text-lg">Лидеры продаж</h2>
              <div className={`${borderStyles} border-t flex flex-col pt-2 gap-1`}>
                  <h3 className="flex flex-row justify-between">
                      Лучший по сумме выручки: 
                      <p className="font-bold text-[#10b981]">
                          {topSeller ? `${topSeller.name} (${topSeller.sum.toLocaleString()} руб.)` : "Данные загружаются..."}
                      </p>
                  </h3>
              </div>
          </div>
      </div>
    </div>
  );
}
