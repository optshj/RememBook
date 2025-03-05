"use client"
import { useState } from "react"

interface TooltipProps {
    children: React.ReactNode
    content: string
}

export default function Tooltip({ children, content }: TooltipProps) {
    const [visible, setVisible] = useState(false)

    return (
        <div className="relative inline-block" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
            {children}
            <div
                className={`transition-all absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-button-black rounded-md shadow-lg ${visible ? "opacity-100" : "opacity-0"} `}>
                {content}
            </div>
        </div>
    )
}
