"use client"
interface CommonButtonProps {
    children?: React.ReactNode
    onClick?: () => void
    color?: "main-blue" | "main-gray"
}
export default function CommonButton({ children, onClick, color = "main-blue" }: CommonButtonProps) {
    const bgColor = color === "main-blue" ? "bg-main-blue" : "bg-main-gray"

    return (
        <button className={`flex items-center text-base gap-1 py-1 font-bold text-white rounded-2xl ${bgColor} w-[100px] justify-center`} onClick={onClick}>
            {children}
        </button>
    )
}
