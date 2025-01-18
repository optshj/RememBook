"use client"
interface CommonButtonProps {
    children?: React.ReactNode
    onClick?: () => void
    color?: "mocha" | "main-gray"
}
export default function CommonButton({ children, onClick, color = "mocha" }: CommonButtonProps) {
    const bgColor = color === "mocha" ? "bg-mocha" : "bg-main-gray"

    return (
        <button className={`flex items-center text-base gap-1 py-1 font-bold text-white rounded-2xl ${bgColor} w-[100px] justify-center`} onClick={onClick}>
            {children}
        </button>
    )
}
