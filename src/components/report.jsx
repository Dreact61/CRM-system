import Header from "./header"
import SettingsStore from "../data/typeSettings";
import reportStore from "../data/typeReports";

export default function Report() {
    const {allReports, error, loading, initReport, addReport} = reportStore()

    initReport()

    const {theme} = SettingsStore()
    const isLight = theme === "light"
    const cardStyles = `flex flex-col w-4/5 md:w-1/3 px-8 md:px-16 mt-8 pt-2 pb-2 rounded-md border-2 m-auto transition-colors ${
        isLight 
          ? "bg-[#4c7dc7] border-[#88b7ff]" 
          : "bg-[#1f293d] border-[#374151]"
      }`;
    
    const textStyles = isLight ? "text-[#f4ffff]" : "text-[#d1d5db]";
    const borderStyles = isLight ? "border-[#f4ffff]" : "border-[#374151]";

    const formStyles = `${borderStyles} px-2 flex justify-between w-full mb-2`
    const inputStyles = `${borderStyles} ${textStyles} p-1 border-2 rounded-md outline-none transition-all ${
        isLight 
          ? "bg-[#5c8ed9] placeholder-[#cbdff7] focus:border-white focus:bg-[#457bc9]" 
          : "bg-[#111827] placeholder-[#6b7280] focus:border-[#4f46e5] focus:bg-[#030712]"
      }`;
      
    const buttonStyles = `${textStyles} ${isLight ? "bg-[#499be7]" : "bg-[#3661e9]"} cursor-pointer rounded-md p-1`

    if (loading) return (
        <div>
            <Header />
            <h1>Loading...</h1>
        </div>
    )
    if (error) return (
        <div>
            <Header />
            <h1>Error: {error.message}</h1>
        </div>
    )
    
    return (
        <div  className={`flex flex-col min-h-screen items-center h-fit transition-colors ${isLight ? "bg-[#3f649bbe]" : "bg-[#0d1b31be]"}`}>
            <Header />

            <div className={`w-screen h-[80vh] md:pt-20 pt-4 flex mb-2 items-center md:justify-center`}>
                    <form className={cardStyles}>
                        <h2 className={`${borderStyles} border-b w-full p-1`}>Заполните всю информацию</h2>

                        <div className={`${formStyles} border-b pb-2`}>
                            <label htmlFor="otKogo">От кого:</label>
                            <input type="text" id="otKogo" placeholder="Полное ФИО" className={inputStyles} required/>
                        </div>
                        <div className={`${formStyles} border-b pb-2`}>
                            <label htmlFor="komu">Кому:</label>
                            <input type="text" id="komu" placeholder="Полное ФИО" className={inputStyles} required/>
                        </div>
                        <div className={`${formStyles} flex-col border-b pb-2`}>
                            <label htmlFor="report">Кому:</label>
                            <textarea className={`${inputStyles} w-full resize-none min-h-[80px] md:h-24`} required type="text" id="komu" placeholder="Описание отчета"/>
                        </div>
                        <div className={`${formStyles} flex-col border-b pb-2 gap-2`}>
                            <p>Временной промежуток:</p>
                            <div className={`${formStyles}`}>
                                <label htmlFor="time-1">От:</label>
                                <input type="date" id="time" className={inputStyles} required/>
                            </div>
                            <div className={`${formStyles}`}>
                                <label htmlFor="time-2">До:</label>
                                <input type="date" id="time" className={inputStyles} required/>
                            </div>
                        </div>

                        <button className={buttonStyles} type="submit">Отправить</button>
                    </form>

                    <div>
                        <h2>Предыдущие отчеты:</h2>

                        <ul className="list-none">
                            {
                                allReports && allReports.length !== 0
                                ? allReports.map((rep, index) => {
                                    <li key={index}>
                                        <h3>Отчетность №{index}</h3>
                                        <p>Aктуален (с-по): {rep.wasWritten} - {rep.expiresAt}</p>
                                        <p>Содержание: {rep.report}</p>
                                        <p>От: {rep.from}</p>
                                        <p>Кому: {rep.to}</p>
                                    </li>
                                })
                                : "Отчетов пока не было."
                            }
                        </ul>
                    </div>
            </div>
        </div>
    )
}