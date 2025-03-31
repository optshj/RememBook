"use client"
import { Dispatch, SetStateAction, useEffect } from "react"

interface ShowMessageProps {
    message: string
    isActive: boolean
    setIsActive: Dispatch<SetStateAction<boolean>>
}
export default function ShowMessage({ message, isActive, setIsActive }: ShowMessageProps) {
    useEffect(() => {
        setTimeout(() => setIsActive(false), 1000)
    })
    return (
        <div
            className={`${isActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"} pointer-events-none fixed bottom-1/2 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-mocha px-4 py-2 font-bold text-white shadow-lg transition-all duration-500`}>
            {message}
        </div>
    )
}
