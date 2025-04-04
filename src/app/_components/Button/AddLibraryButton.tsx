"use client"
import { useRef } from "react"
import { useRipple } from "@/app/_hooks/useRipple"
import { addItem } from "@/app/_hooks/useLocalStorageBook"
import { useShowMessage } from "@/app/_hooks/useShowMessage"

import { BookType } from "@/app/_types/AladinAPIType"

import { BiSolidAddToQueue } from "react-icons/bi"

export default function AddLibraryButton({ book }: { book: BookType }) {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const ripples = useRipple(buttonRef)
    const messages = useShowMessage(buttonRef, "서재에 추가했어요")
    return (
        <button
            className="relative flex h-10 w-40 items-center justify-center gap-2 overflow-hidden rounded-lg bg-mocha font-semibold text-white"
            onClick={() => addItem(book)}
            ref={buttonRef}>
            <BiSolidAddToQueue />
            {ripples}
            {messages}
            {"서재에 담기"}
        </button>
    )
}
