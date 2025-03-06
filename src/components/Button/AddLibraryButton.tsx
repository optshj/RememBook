"use client"
import { BiSolidBookAlt } from "react-icons/bi"

interface SearchItemButtonProps {
    onClick?: () => void
    children: React.ReactNode
}
export default function AddLibraryButton({ onClick, children }: SearchItemButtonProps) {
    return (
        <button className="flex h-10 w-40 items-center justify-center gap-2 rounded-lg bg-mocha font-semibold text-white">
            <BiSolidBookAlt />
            {children}
        </button>
    )
}
