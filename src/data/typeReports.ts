import { Report } from "./types";
import { create } from "zustand";
import axios from "axios";

const REPORTS = `http://localhost:5000/api/reports`

type Store = {
    allReports: Report[],
    lastReport: Report | null,
    error: string | null,
    loading: boolean
    initReport: () => Promise<void>,
    addReport: (newReport: Omit<Report, 'wasWritten'> | Report) => Promise<void>
}

const reportStore = create<Store>()(
        (set, get) => ({
            allReports: [],
            lastReport: null,
            loading: false,
            error: null,

            initReport: async () => {
                try {
                    set({ loading: true, error: null })
                    const res = await axios.get<Report[]>(REPORTS)

                    const safeData = (res && res.data && Array.isArray(res.data)) ? res.data : []
            
                    set({
                        loading: false,
                        allReports: safeData,
                        lastReport: safeData.length > 0 ? safeData[safeData.length - 1] : null
                    })
                    console.log('Новый отчет успешно отправлен!')
                } catch (err: any) {
                    console.error(`Ошибка при загрузке: ${err.message}`)
                    set({ 
                        error: err.message, 
                        loading: false, 
                        allReports: [], 
                        lastReport: null 
                    })
                }
            },
            

            addReport: async (newReport) => {
                try {
                    set({loading: false, error: null})
                    const res = await axios.post(REPORTS, newReport)
                    const createdRep = res.data
                    const currentReps = get().allReports
    
                    set({
                        loading: false,
                        allReports: [...currentReps, createdRep],
                        lastReport: createdRep
                    })
                } catch(err:any) {
                    console.error('Error: ', err.message);
                    set({error: err.message, loading:false})
                }
            }
        })
)

export default reportStore

