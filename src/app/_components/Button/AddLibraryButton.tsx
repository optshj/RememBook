"use client"
import { useRef, useState } from "react"

import { useRipple } from "@/app/_hooks/useRipple"
import { addItem } from "@/app/_hooks/useLocalStorageBook"

import { BookType } from "@/app/_types/AladinAPIType"

import { BiSolidAddToQueue } from "react-icons/bi"

import ShowMessage from "../Text/ShowMessage"

export default function AddLibraryButton({ book }: { book: BookType }) {
    const contentRef = useRef<HTMLButtonElement>(null)
    const ripples = useRipple(contentRef)
    const [isActive, setIsActive] = useState(false)
    const onClick = () => {
        setIsActive(true)
        addItem(book)
    }
    return (
        <>
            <ShowMessage message={"서재에 담겼습니다"} isActive={isActive} setIsActive={setIsActive} />
            <button
                className="relative flex h-10 w-40 items-center justify-center gap-2 overflow-hidden rounded-lg bg-mocha font-semibold text-white"
                onClick={() => onClick()}
                ref={contentRef}>
                <BiSolidAddToQueue />
                {ripples}
                {"서재에 담기"}
            </button>
        </>
    )
}
