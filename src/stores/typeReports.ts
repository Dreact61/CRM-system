import { Employee, Report } from "./types";
import { create } from "zustand";
import axios from "axios";

const REPORTS = `http://localhost:5000/api/reports`
const EMPLOYEES = `http://localhost:5000/api/employees`

type Store = {
    allReports: Report[],
    lastReport: Report | null,
    error: string | null,
    loading: boolean
    initReport: () => Promise<void>,
    addReport: (newReport: Omit<Report, 'was_written'> | Report) => Promise<void>
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
                    const reportsRes = await axios.get<Report[]>(REPORTS)
                    const employeeRes = await axios.get<Employee[]>(EMPLOYEES)

                    const safeData = (reportsRes && reportsRes.data && Array.isArray(reportsRes.data)) ? reportsRes.data : []

                    const mutatedArr:Report[] | undefined = safeData && safeData.length !== 0 
                    ? safeData.map(rep => {
                        const from = employeeRes.data.find(e => e.id === rep.from_address)
                        const to = employeeRes.data.find(e => e.id === rep.to_address)

                        return {
                            from_address: `${from?.name} ${from?.last_name}` || rep.from_address,
                            to_address: `${to?.name} ${to?.last_name}` || rep.to_address,
                            report: rep.report,
                            was_written: rep.was_written,
                            expires_at: rep.expires_at
                        }
                    })
                    : undefined
            
                    set({
                        loading: false,
                        allReports: mutatedArr,
                        lastReport: mutatedArr ? mutatedArr[mutatedArr.length - 1] : null
                    })
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
                    set({loading: true, error: null})
                    const res = await axios.post<Report>(REPORTS, newReport)
                    const createdRep = res.data || newReport
                    const currentReps = get().allReports || []
    
                    set({
                        loading: false,
                        allReports: [...currentReps, createdRep],
                        lastReport: createdRep
                    })
                    console.log("Новый отчет успешно отправлен в бек")
                } catch(err:any) {
                    console.error('Error: ', err.message);
                    set({error: err.message, loading:false})
                }
            }
        })
)

export default reportStore

