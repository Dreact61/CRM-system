import Header from "./header"
import SettingsStore from "../data/typeSettings"
import AnalyticsChart from "../data/AnalyticsCharts"

export default function Analytics() {
    const {theme} = SettingsStore()
    const isLight = theme === 'light'

    return (
        <div className={`text-[10px] md:text-[14px] flex flex-col min-h-screen h-fit transition-colors ${isLight ? "bg-[#3f649bbe]" : "bg-[#0d1b31be]"}`}>
            <Header />

            <AnalyticsChart />
        </div>
    )
}