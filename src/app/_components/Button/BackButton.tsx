"use client"
import { useRouter } from "next/navigation"
interface BackButtonProps {
    children?: React.ReactNode
    color?: "main-blue" | "main-gray"
}
export default function BackButton({ children, color = "main-blue" }: BackButtonProps) {
    const bgColor = color === "main-blue" ? "bg-main-blue" : "bg-main-gray"
    const router = useRouter()
    const onClick = () => {
        router.back()
    }
    return (
        <button className={`flex items-center gap-1 rounded-2xl py-1 text-base font-bold text-white ${bgColor} w-[100px] justify-center`} onClick={onClick}>
            {children}
        </button>
    )
}
