"use client"
import { useState } from "react"

interface TooltipProps {
    children: React.ReactNode
    content: string
}
export default function Tooltip({ children, content }: TooltipProps) {
    const [visible, setVisible] = useState(false)

    return (
        <div className="relative" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
            {children}
            <div
                className={`absolute bottom-full left-1/2 mb-2 -translate-x-1/2 transform rounded-md bg-button-black px-2 py-1 text-xs text-white shadow-lg transition-all ${visible ? "opacity-100" : "opacity-0"} `}>
                {content}
            </div>
        </div>
    )
}
