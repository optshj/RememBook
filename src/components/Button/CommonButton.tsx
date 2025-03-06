"use client"
interface CommonButtonProps {
    children?: React.ReactNode
    onClick?: () => void
    color?: "mocha" | "main-gray"
}
export default function CommonButton({ children, onClick, color = "mocha" }: CommonButtonProps) {
    const bgColor = color === "mocha" ? "bg-mocha" : "bg-main-gray"

    return (
        <button className={`flex items-center gap-1 rounded-2xl py-1 text-base font-bold text-white ${bgColor} w-[100px] justify-center`} onClick={onClick}>
            {children}
        </button>
    )
}
