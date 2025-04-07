"use client"
import { useState, useEffect, useRef } from "react"
import { useAppDispatch } from "@/app/_store/Provider"
import { setBookData } from "@/app/_store/module/bookData"

import { BiSolidStar } from "react-icons/bi"
import { BookType } from "@/app/_types/AladinAPIType"

import StateButton from "@/app/_components/Button/StateButton"
import Calender from "./Calender"
import Rating from "./Rating"

export default function BookDetails({ book }: { book: BookType }) {
    const title = book.title.split("-")[0]
    const [data, setData] = useState({ rating: 0, date: "", state: 0, categoryId: book.categoryId, title: title, author: book.author })
    const [open, setOpen] = useState(0) // 0 : close, 1 : rating, 2 : calender, 3 : state
    const dispatch = useAppDispatch()
    dispatch(setBookData(data))

    const ratingRef = useRef<HTMLLIElement>(null)
    const calendeRef = useRef<HTMLLIElement>(null)
    const stateRef = useRef<HTMLLIElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                calendeRef.current &&
                !calendeRef.current.contains(event.target as Node) &&
                ratingRef.current &&
                !ratingRef.current.contains(event.target as Node) &&
                stateRef.current &&
                !stateRef.current.contains(event.target as Node)
            ) {
                setOpen(0)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    useEffect(() => {
        const localBookData = localStorage.getItem(book.isbn13)
        if (localBookData) {
            const { rating, date, state, categoryId, title, author } = JSON.parse(localBookData)
            setData({ rating, date, state, categoryId, title, author })
        }
    }, [book.isbn13])

    return (
        <div className="z-50 mt-4 flex flex-row text-sm font-semibold text-main-gray">
            <ul className="mr-2 flex flex-col whitespace-nowrap">
                {["나의평가", "읽은기간", "상태"].map(label => (
                    <li key={label} className="py-1">
                        {label}
                    </li>
                ))}
            </ul>
            <ul className="flex w-full flex-col">
                {/* rating select */}
                <li className={`relative rounded-lg ${open == 1 && "shadow-lg"}`} onClick={() => setOpen(prev => (prev == 1 ? 0 : 1))} ref={ratingRef}>
                    <div className="flex cursor-pointer items-center rounded-md p-1 text-yellow hover:bg-zinc-100">
                        <BiSolidStar />
                        {data.rating || "비어있음"}
                    </div>
                    <Rating
                        rating={data.rating}
                        setData={setData}
                        className={`transition-all duration-300 ${open == 1 ? "visible opacity-100" : "invisible opacity-0"}`}
                    />
                </li>
                {/* calender select */}
                <li className={`relative ${open == 2 && "shadow-lg"}`} onClick={() => setOpen(2)} ref={calendeRef}>
                    <div className="cursor-pointer rounded-md p-1 hover:bg-zinc-100">{data.date || "비어있음"}</div>
                    <Calender
                        date={data.date}
                        setOpen={setOpen}
                        setData={setData}
                        className={`transition-all duration-300 ${open == 2 ? "visible opacity-100" : "invisible opacity-0"} `}
                    />
                </li>
                {/* state select */}
                <li className={`relative ${open == 3 && "shadow-lg"}`} onClick={() => setOpen(prev => (prev == 3 ? 0 : 3))} ref={stateRef}>
                    <div className={`cursor-pointer rounded-md p-1 hover:bg-zinc-100`}>
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
