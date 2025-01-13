"use client"
import { HiPencil } from "react-icons/hi2"
import { useRouter } from "next/navigation"

export default function BookReportButton({ isbn13digit }: { isbn13digit: string }) {
    const router = useRouter()
    const handleWriteReview = () => {
        router.push(`/information?isbn13=${isbn13digit}`)
    }
    return (
        <button
            className="absolute z-10 flex items-center justify-center gap-1 px-2 py-1 text-sm font-semibold text-white rounded-lg bg-button-black bottom-2 right-2"
            onClick={handleWriteReview}>
            <HiPencil />
            {"독후감 작성"}
        </button>
    )
}
