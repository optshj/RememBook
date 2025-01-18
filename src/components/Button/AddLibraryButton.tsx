"use client"
import { BiSolidBookAlt } from "react-icons/bi"

interface SearchItemButtonProps {
    onClick?: () => void
    children: React.ReactNode
}
export default function AddLibraryButton({ onClick, children }: SearchItemButtonProps) {
    return (
        <button className="flex w-40 h-10 bg-mocha rounded-lg items-center justify-center text-white gap-2 font-semibold">
            <BiSolidBookAlt />
            {children}
        </button>
    )
}
