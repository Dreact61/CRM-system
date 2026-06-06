import { Report } from "./types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const API_URL = `http://localhost:5000/reports`

const fetchReports = async () => {
    try {
        const res = await fetch(`${API_URL}`)

        if (!res.ok) throw new Error('Error while fetching reports.')

        const rawData = await res.json()
        const parsed = JSON.parse(rawData)

        if(parsed.length === 0) return null
        return parsed
    } catch(err) {
        console.error(err)
        return null
    }
}

type Store = {
    allReports: Report[] | null,
    lastReport: Report[] | null,
    error: string | null,
    loading: boolean
    initReport: () => Promise<void>
    addReport: (newReport: Report) => void
}

const reportStore = create<Store>()(
    persist(
        set => ({
            allReports: [],
            lastReport: [],
            loading: false,
            error: null,

            initReport: async () => {
                set({loading: true, error: null})
                try {
                    const res = await fetch(`${API_URL}`)
            
                    if (!res.ok) throw new Error('Error while fetching reports.')
            
                    const rawData = await res.json()
                    const parsed = JSON.parse(rawData.reports)
            
                    if(parsed.length === 0) return null
                    set({
                        allReports: parsed,
                        lastReport: parsed[parsed.length - 1],
                        loading: false
                    })
                } catch(err:any) {
                    console.error(err)
                    set({error: err.message, loading: false})
                }
            },

            addReport: (newReport) => set((state) => {
                const update = [...state.allReports, newReport]
                return {
                    allReports: update,
                    lastReport: newReport
                }
            })
        }),
        {name: 'reports', partialize: (state:Store) => ({allReports: state.allReports})}
    )
)

export default reportStore

