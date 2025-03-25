"use client"
import Link from "next/link"
import { useRef } from "react"

import { useRipple } from "@/app/_hooks/useRipple"

import { HiPencil } from "react-icons/hi2"

interface BookReportButtonProps {
    isbn13: string
    className?: string
    large?: boolean
}
export default function BookReportButton({ isbn13, className, large = false }: BookReportButtonProps) {
    const contentRef = useRef<HTMLButtonElement>(null)
    const ripples = useRipple(contentRef)

    return (
        <Link href={`/information?isbn13=${isbn13}`} scroll={false}>
            <button
                className={`${large ? "relative h-10 w-40 text-base" : "absolute bottom-2 right-2 px-2 py-1 text-sm"} z-10 flex items-center justify-center gap-0.5 overflow-hidden rounded-lg bg-button-black font-semibold text-white ${className}`}
                ref={contentRef}>
                <HiPencil />
                {ripples}
                {"기록하기"}
            </button>
        </Link>
    )
}
