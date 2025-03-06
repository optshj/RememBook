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
            className={`flex h-10 w-40 items-center justify-center gap-2 rounded-lg bg-button-black font-semibold text-white ${className}`}
            onClick={handleWriteReview}>
            <HiPencil />
            {"독후감 작성"}
        </button>
    ) : (
        <button
            className={`absolute bottom-2 right-2 z-10 flex items-center justify-center gap-1 rounded-lg bg-button-black px-2 py-1 text-sm font-semibold text-white ${className}`}
            onClick={handleWriteReview}>
            <HiPencil />
            {"독후감 작성"}
        </button>
    )
}
