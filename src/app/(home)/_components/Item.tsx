"use client"
import Image from "next/image"

import { BookType } from "@/types/AladinAPIType"

import StateButton from "@/components/Button/StateButton"
import BookReportButton from "@/components/Button/BookReportButton"
import { useEffect, useState } from "react"

export default function Item({ book }: { book: BookType }) {
    const category = book.categoryName
    const categoryArray = category.split(">")
    const [state, setState] = useState(0)

    useEffect(() => {
        const localBookData = localStorage.getItem(book.isbn13)
        console.log(localBookData)
        if (localBookData) {
            const { rating, date, state } = JSON.parse(localBookData).state
            setState(state)
        }
    }, [])

    return (
        <li className="relative flex flex-col">
            <div className="relative w-48 h-72 group">
                <Image src={book.cover} alt={book.title} className="rounded-lg cursor-pointer" quality={100} sizes="20vw" fill={true} />
                <div className="absolute inset-0 bg-black opacity-0 rounded-lg group-hover:opacity-30 transition-opacity duration-300" />
                <StateButton state={state} className="absolute z-10 top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <BookReportButton isbn13={book.isbn13} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="mt-2 text-sm font-semibold text-main-gray">{categoryArray[1]}</div>
            <div className="text-base font-bold whitespace-normal line-clamp-2">{book.title.split("-")[0]}</div>
        </li>
    )
}
