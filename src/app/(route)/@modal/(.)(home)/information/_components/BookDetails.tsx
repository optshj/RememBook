"use client"
import { useState, useEffect } from "react"

import { FaStar } from "react-icons/fa6"

import StateButton from "@/app/_components/Button/StateButton"
import Calender from "./Calender"
import Rating from "./Rating"

import { useAppDispatch } from "@/app/_store/Provider"
import { setBookData } from "@/app/_store/module/bookData"

interface BookDetailsProps {
    isbn13: string
}
export default function BookDetails({ isbn13 }: BookDetailsProps) {
    const [data, setData] = useState({ rating: 0, date: "", state: 0 })
    const [open, setOpen] = useState(0) // 0 : close, 1 : rating, 2 : calender, 3 : state
    const dispatch = useAppDispatch()
    dispatch(setBookData(data))

    useEffect(() => {
        const localBookData = localStorage.getItem(isbn13)
        if (localBookData) {
            const { rating, date, state } = JSON.parse(localBookData)
            setData({ rating, date, state })
        }
    }, [isbn13])

    return (
        <div className="z-50 flex flex-row text-sm font-semibold text-main-gray">
            <ul className="mr-2 flex flex-col">
                {["나의평가", "읽은기간", "상태"].map(label => (
                    <li key={label} className="py-1">
                        {label}
                    </li>
                ))}
            </ul>
            <ul className="flex w-full flex-col">
                {/* rating select */}
                <li
                    className={`relative rounded-lg ${open == 1 && "shadow-lg"}`}
                    tabIndex={0}
                    onClick={() => setOpen(prev => (prev == 1 ? 0 : 1))}
                    onBlur={() => setOpen(0)}>
                    <div className="flex cursor-pointer items-center gap-1 rounded-md p-1 text-yellow hover:bg-zinc-100">
                        <FaStar />
                        {data.rating || "비어있음"}
                    </div>
                    <Rating
                        rating={data.rating}
                        setData={setData}
                        className={`transition-all duration-300 ${open == 1 ? "visible opacity-100" : "invisible opacity-0"}`}
                    />
                </li>
                {/* calender select */}
                <li
                    className={`relative ${open == 2 && "shadow-lg"}`}
                    tabIndex={0}
                    onBlur={() => setOpen(0)}
                    onClick={() => setOpen(prev => (prev == 2 ? 0 : 2))}>
                    <div className="cursor-pointer rounded-md p-1 hover:bg-zinc-100">{data.date || "비어있음"}</div>
                    <Calender
                        date={data.date}
                        setData={setData}
                        className={`transition-all duration-300 ${open == 2 ? "visible opacity-100" : "invisible opacity-0"} `}
                    />
                </li>
                {/* state select */}
                <li className={`relative ${open == 3 && "shadow-lg"}`}>
                    <div
                        className={`cursor-pointer rounded-md p-1 hover:bg-zinc-100`}
                        onClick={() => setOpen(prev => (prev == 3 ? 0 : 3))}
                        tabIndex={0}
                        onBlur={() => setOpen(0)}>
                        <StateButton state={data.state} />
                    </div>
                    <div
                        className={`absolute w-full rounded-b-md bg-white shadow-lg transition-all duration-300 ${
                            open == 3 ? "visible opacity-100" : "invisible opacity-0"
                        }`}>
                        <div className="m-1 h-0.5 w-auto bg-zinc-100" />
                        {[0, 1, 2].map(s => (
                            <div
                                key={s}
                                className="cursor-pointer p-1 hover:bg-gray-100"
                                onClick={() => {
                                    setData({ ...data, state: s })
                                }}>
                                <StateButton state={s} />
                            </div>
                        ))}
                    </div>
                </li>
            </ul>
        </div>
    )
}
