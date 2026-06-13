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
  import SettingsStore from "../stores/typeSettings";
import employeesData from "../data/employees.json";
const employees = employeesData.employees;
  
  const monthlyPlan = [
    { month: "Янв", "План по выручке": 1900000, "План по сделкам": 12 },
    { month: "Фев", "План по выручке": 2000000, "План по сделкам": 13 },
    { month: "Мар", "План по выручке": 1400000, "План по сделкам": 10 },
    { month: "Апр", "План по выручке": 1000000, "План по сделкам": 8 },
    { month: "Май", "План по выручке": 800000, "План по сделкам": 7 },
  ];
  
  const monthlyFact = [
    { month: "Янв", "Факт по выручке": 2113045, "Факт по сделкам": 14 },
    { month: "Фев", "Факт по выручке": 1834689, "Факт по сделкам": 11 },
    { month: "Мар", "Факт по выручке": 1019942, "Факт по сделкам": 9 },
    { month: "Апр", "Факт по выручке": 1178234, "Факт по сделкам": 9 },
    { month: "Май", "Факт по выручке": 853920, "Факт по сделкам": 3 },
  ];
  
  const totalSumData = monthlyPlan.map(p => {
    const matchingFact = monthlyFact.find(f => p.month === f.month)
    return {
        month: p.month,
        "План по выручке": p["План по выручке"],
        "Факт по выручке": matchingFact ? matchingFact["Факт по выручке"] : 0
    }
  });
  
  const totalDealData = monthlyPlan.map(p => {
    const matchingFact = monthlyFact.find(f => p.month === f.month)
    return {
        month: p.month,
        "План по сделкам": p["План по сделкам"],
        "Факт по сделкам": matchingFact ? matchingFact["Факт по сделкам"] : 0
    }
  });
  
  export default function AnalyticsChart() {

    const { theme } = SettingsStore();
    const isLight = theme === "light";
  
    const strokeColor = isLight ? "#3e3e3e" : "#d1d5db";
    const gridColor = isLight ? "#e5e7eb" : "#374151";
    const tooltipBg = isLight ? "#ffffff" : "#1f293d";

    const cardStyles = `flex flex-col px-8 md:mt-0 mt-8 pt-2 pb-2 rounded-md border-2 m-auto transition-colors ${
        isLight 
          ? "bg-[#4c7dc7] border-[#88b7ff]" 
          : "bg-[#1f293d] border-[#374151]"
      }`;
    
      const textStyles = isLight ? "text-[#f4ffff]" : "text-[#d1d5db]";
      const borderStyles = isLight ? "border-[#f4ffff]" : "border-[#374151]";
  
    return (
      <div className="m-auto md:w-3/4 w-full h-fit flex flex-col md:gap-6 p-4 md:p-6">

        <div className="flex flex-col md:flex-row gap-6 w-full justify-start items-start">
            
            <div className={`p-5 w-full md:w-2/3 rounded-md border-2 transition-colors ${
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
                      <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderRadius: '6px', color: strokeColor, borderColor: gridColor }} />
                      <Legend />
                      <Line type="monotone" dataKey="План по выручке" stroke="#499be7" strokeWidth={2.5} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="Факт по выручке" stroke="#10b981" strokeWidth={2.5} activeDot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
    
            <div className={`p-5 w-full md:w-2/3 rounded-md border-2 transition-colors ${
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
                      <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderRadius: '6px', color: strokeColor, borderColor: gridColor }} />
                      <Legend />
                      <Bar dataKey="План по сделкам" fill="#499be7" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Факт по сделкам" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            
        </div>

        <div className={`${cardStyles} w-full`}>
            <h2 className={`${textStyles}`}>Полная аналитика</h2>

            <div className={`${borderStyles} ${textStyles} px-8 md:px-16 flex flex-col border-t pt-2`}>
                <h2 className="self-start">План за {monthlyPlan[monthlyPlan.length-1].month}</h2>
                <div className={`${borderStyles} border-t border-b flex flex-col pt-2 pb-2`}>
                    <h3 className={`${textStyles} flex flex-row justify-between`}>Изначальный план: <p>{monthlyPlan[monthlyPlan.length - 1]["План по выручке"]}</p></h3>
                    <h3 className={`${textStyles} flex flex-row justify-between`}>Нынешний результат: <p>{monthlyFact[monthlyFact.length - 1]["Факт по выручке"]}</p></h3>
                    <h3 className={`${textStyles} flex flex-row justify-between`}>План выполнен на: <p>{Math.round(monthlyFact[monthlyFact.length - 1]["Факт по выручке"]/monthlyPlan[monthlyPlan.length - 1]["План по выручке"] * 100)}%</p></h3>
                </div>
                <div className={`${borderStyles} border-t border-b flex flex-col pt-2 pb-2`}>
                    <h3 className={`${textStyles} flex flex-row justify-between`}>Сделок запланировано: <p>{monthlyPlan[monthlyPlan.length - 1]["План по сделкам"]}</p></h3>
                    <h3 className={`${textStyles} flex flex-row justify-between`}>Сделок совершено: <p>{monthlyFact[monthlyFact.length - 1]["Факт по сделкам"]}</p></h3>
                    <h3 className={`${textStyles} flex flex-row justify-between`}>План выполнен на: <p>{Math.round(monthlyFact[monthlyFact.length - 1]["Факт по сделкам"]/monthlyPlan[monthlyPlan.length - 1]["План по сделкам"] * 100)}%</p></h3>
                </div>
            </div>

            <div className={`${borderStyles} ${textStyles} px-8 md:px-16 flex flex-col pt-2`}>
                <h2 className="self-start">Топ работников</h2>
                <div className={`${borderStyles} border-t flex flex-col pt-2`}>
                    <h3 className={`${textStyles} flex flex-row justify-between`}>По кол-ву успешных сделок: <p>{employees[0].name} {employees[0].lastName}</p></h3>
                    <h3 className={`${textStyles} flex flex-row justify-between`}>По продажам: <p>{employees[0].name} {employees[0].lastName}</p></h3>
                </div>
            </div>
            
        </div>
      </div>
    );
  }
  