"use client"
import { useRef, useState } from "react"

import { useRipple } from "@/app/_hooks/useRipple"

import { BiSolidAddToQueue } from "react-icons/bi"
import ShowMessage from "../Text/ShowMessage"
import { addItem } from "@/app/_hooks/useLocalStorageBook"

export default function AddLibraryButton({ isbn13 }: { isbn13: string }) {
    const contentRef = useRef<HTMLButtonElement>(null)
    const ripples = useRipple(contentRef)
    const [isActive, setIsActive] = useState(false)
    const onClick = () => {
        setIsActive(true)
        addItem(isbn13)
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
