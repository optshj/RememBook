"use client"
import { useRef } from "react"
import { useRouter } from "next/navigation"

import { useRipple } from "@/app/_hooks/useRipple"

import { HiPencil } from "react-icons/hi2"

interface BookReportButtonProps {
    isbn13: string
    className?: string
    large?: boolean
}
export default function BookReportButton({ isbn13, className = "", large = false }: BookReportButtonProps) {
    const contentRef = useRef<HTMLButtonElement>(null)
    const ripples = useRipple(contentRef)
    const router = useRouter()
    const handleWriteReview = () => {
        router.push(`/information?isbn13=${isbn13}`)
    }
    return large ? (
        <button
            className={`relative flex h-10 w-40 items-center justify-center gap-2 overflow-hidden rounded-lg bg-button-black font-semibold text-white ${className}`}
            onClick={handleWriteReview}
            ref={contentRef}>
            <HiPencil />
            {ripples}
            {"독후감 작성"}
        </button>
    ) : (
        <button
            className={`absolute bottom-2 right-2 z-10 flex items-center justify-center gap-1 rounded-lg bg-button-black px-2 py-1 text-sm font-semibold text-white ${className}`}
            onClick={handleWriteReview}
            ref={contentRef}>
            <HiPencil />
            {ripples}
            {"독후감 작성"}
        </button>
    )
}
