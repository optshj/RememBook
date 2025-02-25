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
    const [rating, setRating] = useState(0.0)

    const [ratingOpen, setRatingOpen] = useState(false)
    const [calenderOpen, setCalenderOpen] = useState(false)
    const [stateOpen, setStateOpen] = useState(false)

    const ratingRef = useRef<HTMLDivElement>(null)
    const calenderRef = useRef<HTMLDivElement>(null)
    const stateRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node | null

            if (ratingRef.current && !ratingRef.current.contains(target)) setRatingOpen(false)
            if (calenderRef.current && !calenderRef.current.contains(target)) setCalenderOpen(false)
            if (stateRef.current && !stateRef.current.contains(target)) setStateOpen(false)
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [date])

    return (
        <div className="flex flex-row text-sm font-semibold text-main-gray z-50">
            <div className="flex flex-col mr-2">
                {["나의평가", "읽은기간", "상태"].map(label => (
                    <div key={label} className="py-1">
                        {label}
                    </div>
                ))}
            </div>
            <div className="flex flex-col w-full">
                {/* rating select */}
                <div className={`relative rounded-lg ${ratingOpen ? "shadow-lg" : ""}`} ref={ratingRef} onClick={() => setRatingOpen(prev => !prev)}>
                    <div className="text-yellow flex gap-1 items-center p-1 rounded-md cursor-pointer hover:bg-zinc-100">
                        <FaStar />
                        {rating}
                    </div>
                    <Rating setRating={setRating} className={`transition-all duration-300 ${ratingOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} />
                </div>
                {/* calender select */}
                <div className={`relative ${calenderOpen ? "shadow-lg" : ""}`} ref={calenderRef}>
                    <div className="p-1 rounded-md cursor-pointer hover:bg-zinc-100" onClick={() => setCalenderOpen(prev => !prev)}>
                        {date || "비어있음"}
                    </div>
                    <Calender setDate={setDate} className={`transition-all duration-300 ${calenderOpen ? "opacity-100 visible" : "opacity-0 invisible"} `} />
                </div>
                {/* state select */}
                <div className={`relative ${stateOpen ? "shadow-lg" : ""}`}>
                    <div className={`p-1 rounded-md cursor-pointer hover:bg-zinc-100`} onClick={() => setStateOpen(prev => !prev)} ref={stateRef}>
                        <StateButton state={state} />
                    </div>
                    <div
                        className={`absolute w-full bg-white shadow-lg rounded-b-md transition-all duration-300 ${
                            stateOpen ? " opacity-100 visible" : "opacity-0 invisible"
                        }`}>
                        <div className="w-auto bg-zinc-100 h-0.5 m-1"></div>
                        {[0, 1, 2].map(s => (
                            <div
                                key={s}
                                className="p-1 cursor-pointer hover:bg-gray-100"
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
