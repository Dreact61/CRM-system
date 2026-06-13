import { create } from "zustand";
import { persist } from "zustand/middleware";

export type settingsValue = {
    theme: "light" | "dark",
}

export type settingsActions = {
    setThemeToDark: () => void,
    setThemeToLight: () => void,
}

export type StoreType = settingsActions & settingsValue

const SettingsStore = create<StoreType>()(
    persist(
        (set) => ({
            theme: "light",
            setThemeToDark() {
                set({theme: "dark"})
            },

            setThemeToLight() {
                set({theme: "light"})
            },
        }),
        {name: "settings"}
    )
)

export default SettingsStore