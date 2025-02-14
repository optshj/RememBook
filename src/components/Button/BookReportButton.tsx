"use client"
import { useRouter } from "next/navigation"

import { HiPencil } from "react-icons/hi2"

interface BookReportButtonProps {
    isbn13: string
    className?: string
    large?: boolean
}
export default function BookReportButton({ isbn13, className = "", large = false }: BookReportButtonProps) {
    const router = useRouter()
    const handleWriteReview = () => {
        router.push(`/information?isbn13=${isbn13}`)
    }
    return large ? (
        <button
            className={`flex w-40 h-10 bg-button-black rounded-lg items-center justify-center text-white gap-2 font-semibold ${className}`}
            onClick={handleWriteReview}>
            <HiPencil />
            {"독후감 작성"}
        </button>
    ) : (
        <button
            className={`absolute z-10 flex items-center justify-center gap-1 px-2 py-1 text-sm font-semibold text-white rounded-lg bg-button-black bottom-2 right-2 ${className}`}
            onClick={handleWriteReview}>
            <HiPencil />
            {"독후감 작성"}
        </button>
    )
}
