"use client"
import React, { useEffect, useState, useRef } from "react"
import ScrollContainer from "react-indiana-drag-scroll"

import { SlArrowLeft, SlArrowRight } from "react-icons/sl"

export default function ScrollWrapper({ children }: { children: React.ReactNode }) {
    const scrollRef = useRef<HTMLElement>(null)
    /*
     * @param direction: boolean
     * @description: direction == false -> left, direction == true -> right
     */
    const handleScroll = (direction: boolean) => {
        if (scrollRef.current) {
            const scrollAmount = direction === false ? -1060 : 1060
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
                className={`absolute z-10 p-2 -translate-y-1/2 border-2 rounded-full -left-14 top-1/2 ${isAtStart ? "text-main-gray cursor-default" : "text-black"}`}>
                <SlArrowLeft size={16} />
            </button>
            <button
                onClick={() => handleScroll(true)}
                className={`absolute z-10 p-2 -translate-y-1/2 border-2 rounded-full -right-14 top-1/2 ${isAtEnd ? "text-main-gray cursor-default" : "text-black"}`}>
                <SlArrowRight size={16} />
            </button>
            <ScrollContainer innerRef={scrollRef} className="flex overflow-x-auto gap-8">
                {children}
            </ScrollContainer>
        </>
    )
}
