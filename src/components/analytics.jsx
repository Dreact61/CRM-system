import Header from "./header"
import SettingsStore from "../data/typeSettings"
import AnalyticsChart from "../data/AnalyticsCharts"

export default function Analytics() {
    const {theme} = SettingsStore()
    const isLight = theme === 'light'

    return (
        <div className={`flex flex-col h-fit transition-colors ${isLight ? "bg-[#3f649bbe]" : "bg-[#0d1b31be]"}`}>
            <Header />

            <AnalyticsChart />
        </div>
    )
}