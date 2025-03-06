"use client"
import React, { useEffect, useState, useRef } from "react"
import ScrollContainer from "react-indiana-drag-scroll"

import { SlArrowLeft, SlArrowRight } from "react-icons/sl"

export default function ScrollWrapper({ children }: { children: React.ReactNode }) {
    const scrollRef = useRef<HTMLElement>(null)
    const size = (192 + 16) * 5 // (imgWidth + gap) * itemNum
    /*
     * @param direction: boolean
     * @description: direction == false -> left, direction == true -> right
     */
    const handleScroll = (direction: boolean) => {
        if (scrollRef.current) {
            const scrollAmount = direction === false ? -size : size
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
        }
    }
    const [isAtStart, setIsAtStart] = useState(true)
    const [isAtEnd, setIsAtEnd] = useState(false)

    const checkScrollPosition = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
            setIsAtStart(scrollLeft <= 0)
            setIsAtEnd(scrollLeft + clientWidth >= scrollWidth)
        }
    }

    useEffect(() => {
        const currentScrollRef = scrollRef.current
        if (currentScrollRef) {
            currentScrollRef.addEventListener("scroll", checkScrollPosition)
        }
        return () => {
            if (currentScrollRef) {
                currentScrollRef.removeEventListener("scroll", checkScrollPosition)
            }
        }
    }, [])

    return (
        <>
            <button
                onClick={() => handleScroll(false)}
                className={`absolute -left-14 top-1/2 z-10 -translate-y-1/2 rounded-full border-2 p-2 ${isAtStart ? "cursor-default text-main-gray" : "text-black"}`}>
                <SlArrowLeft size={16} />
            </button>
            <button
                onClick={() => handleScroll(true)}
                className={`absolute -right-14 top-1/2 z-10 -translate-y-1/2 rounded-full border-2 p-2 ${isAtEnd ? "cursor-default text-main-gray" : "text-black"}`}>
                <SlArrowRight size={16} />
            </button>
            <ScrollContainer innerRef={scrollRef} className="flex gap-4 overflow-x-auto">
                {children}
            </ScrollContainer>
        </>
    )
}
