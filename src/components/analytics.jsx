import Header from "./header"
import SettingsStore from "../data/typeSettings"
import AnalyticsChart from "../data/AnalyticsCharts"

export default function Analytics() {
    const {theme} = SettingsStore()
    const isLight = theme === 'light'

    const cardStyles = `flex flex-col px-8 mt-8 pt-2 pb-2 rounded-md border-2 m-auto transition-colors ${
        isLight 
          ? "bg-[#4c7dc7] border-[#88b7ff]" 
          : "bg-[#1f293d] border-[#374151]"
      }`;
    
      const textStyles = isLight ? "text-[#f4ffff]" : "text-[#d1d5db]";
      const borderStyles = isLight ? "border-[#f4ffff]" : "border-[#374151]";
      
      const buttonStyles = `${textStyles} ${isLight ? "bg-[#499be7]" : "bg-[#3661e9]"} cursor-pointer rounded-md p-1`

    return (
        <div className={`flex flex-col h-fit transition-colors ${isLight ? "bg-[#3f649bbe]" : "bg-[#0d1b31be]"}`}>
            <Header />

            <AnalyticsChart />
        </div>
    )
}