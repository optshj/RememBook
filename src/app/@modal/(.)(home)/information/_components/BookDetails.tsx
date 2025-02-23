"use client"
import { useState } from "react"

import { FaStar } from "react-icons/fa6"

import StateButton from "@/components/Button/StateButton"

import Calender from "./Calender"

interface BookDetailsProps {
    isbn13: string
}
export default function BookDetails({ isbn13 }: BookDetailsProps) {
    const [stateOpen, setStateOpen] = useState(false)
    const [state, setState] = useState(0)

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
                <div className="text-yellow flex gap-1 items-center p-1 rounded-md cursor-pointer hover:bg-zinc-100">
                    <FaStar />
                    {"3.9"}
                </div>
                {/* date select */}
                <div className="relative">
                    <div className="p-1 rounded-md cursor-pointer hover:bg-zinc-100">{"2024.12.27 ~ 2024.12.31"}</div>
                    <Calender className="absolute z-50" />
                </div>
                {/* state select */}
                <div className={`relative ${stateOpen && "shadow-lg"}`}>
                    <div className={`p-1 rounded-md cursor-pointer hover:bg-zinc-100`} onClick={() => setStateOpen(prev => !prev)}>
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
                                    setStateOpen(false)
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
