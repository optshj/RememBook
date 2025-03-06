"use client"
import { useState, useRef, useEffect } from "react"

import { FaStar } from "react-icons/fa6"

import StateButton from "@/components/Button/StateButton"
import Calender from "./Calender"
import Rating from "./Rating"

interface BookDetailsProps {
    isbn13: string
}
export default function BookDetails({ isbn13 }: BookDetailsProps) {
    const [state, setState] = useState(0)
    const [date, setDate] = useState("")
    const [rating, setRating] = useState(0)

    const [ratingOpen, setRatingOpen] = useState(false)
    const [calenderOpen, setCalenderOpen] = useState(false)
    const [stateOpen, setStateOpen] = useState(false)

    const ratingRef = useRef<HTMLDivElement>(null)
    const calenderRef = useRef<HTMLDivElement>(null)
    const stateRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const localBookData = localStorage.getItem(isbn13)
            const bookData = localBookData ? JSON.parse(localBookData) : {}
            const newBookData = {
                ...bookData,
                rating,
                date,
                state
            }
            localStorage.setItem(isbn13, JSON.stringify(newBookData))

            const target = event.target as Node | null

            if (ratingRef.current && !ratingRef.current.contains(target)) setRatingOpen(false)
            if (calenderRef.current && !calenderRef.current.contains(target)) setCalenderOpen(false)
            if (stateRef.current && !stateRef.current.contains(target)) setStateOpen(false)
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [rating, date, state, isbn13])

    useEffect(() => {
        const localBookData = localStorage.getItem(isbn13)
        if (localBookData) {
            const { rating, date, state } = JSON.parse(localBookData)
            setRating(rating)
            setDate(date)
            setState(state)
        }
    }, [isbn13])

    return (
        <div className="z-50 flex flex-row text-sm font-semibold text-main-gray">
            <div className="mr-2 flex flex-col">
                {["나의평가", "읽은기간", "상태"].map(label => (
                    <div key={label} className="py-1">
                        {label}
                    </div>
                ))}
            </div>
            <div className="flex w-full flex-col">
                {/* rating select */}
                <div className={`relative rounded-lg ${ratingOpen ? "shadow-lg" : ""}`} ref={ratingRef} onClick={() => setRatingOpen(prev => !prev)}>
                    <div className="flex cursor-pointer items-center gap-1 rounded-md p-1 text-yellow hover:bg-zinc-100">
                        <FaStar />
                        {rating || "비어있음"}
                    </div>
                    <Rating
                        rating={rating}
                        setRating={setRating}
                        className={`transition-all duration-300 ${ratingOpen ? "visible opacity-100" : "invisible opacity-0"}`}
                    />
                </div>
                {/* calender select */}
                <div className={`relative ${calenderOpen ? "shadow-lg" : ""}`} ref={calenderRef}>
                    <div className="cursor-pointer rounded-md p-1 hover:bg-zinc-100" onClick={() => setCalenderOpen(prev => !prev)}>
                        {date || "비어있음"}
                    </div>
                    <Calender
                        date={date}
                        setDate={setDate}
                        className={`transition-all duration-300 ${calenderOpen ? "visible opacity-100" : "invisible opacity-0"} `}
                    />
                </div>
                {/* state select */}
                <div className={`relative ${stateOpen ? "shadow-lg" : ""}`}>
                    <div className={`cursor-pointer rounded-md p-1 hover:bg-zinc-100`} onClick={() => setStateOpen(prev => !prev)} ref={stateRef}>
                        <StateButton state={state} />
                    </div>
                    <div
                        className={`absolute w-full rounded-b-md bg-white shadow-lg transition-all duration-300 ${
                            stateOpen ? "visible opacity-100" : "invisible opacity-0"
                        }`}>
                        <div className="m-1 h-0.5 w-auto bg-zinc-100"></div>
                        {[0, 1, 2].map(s => (
                            <div
                                key={s}
                                className="cursor-pointer p-1 hover:bg-gray-100"
                                onClick={() => {
                                    setState(s)
                                }}>
                                <StateButton state={s} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
