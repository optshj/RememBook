"use client"
import { useRef } from "react"

import { useRipple } from "@/app/_hooks/useRipple"

import { BiSolidAddToQueue } from "react-icons/bi"

export default function AddLibraryButton({ onClick }: { onClick: () => void }) {
    const contentRef = useRef<HTMLButtonElement>(null)
    const ripples = useRipple(contentRef)

    return (
        <button
            className="relative flex h-10 w-40 items-center justify-center gap-2 overflow-hidden rounded-lg bg-mocha font-semibold text-white"
            onClick={onClick}
            ref={contentRef}>
            <BiSolidAddToQueue />
            {ripples}
            {"서재에 담기"}
        </button>
    )
}
