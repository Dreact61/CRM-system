import { Report } from "./types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const API_URL = `http://localhost:5000/report`

type Store = {
    allReports: Report[],
    lastReport: Report | {},
    error: string | null,
    loading: boolean
    initReport: () => Promise<void>
    addReport: (newReport: Report) => void
}

const reportStore = create<Store>()(
    persist(
        set => ({
            allReports: [],
            lastReport: {},
            loading: false,
            error: null,

            initReport: async () => {
                try{
                   set({loading: true, error: null})

                   const res = await axios.get<Report[]>(API_URL)
                   set({
                    loading: false,
                    allReports: res.data,
                    lastReport: res.data[res.data.length - 1]
                })
                } catch(err: any) {
                    console.error(`Error: ${err.message}`)
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

