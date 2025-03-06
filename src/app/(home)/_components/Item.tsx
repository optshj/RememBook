"use client"
import { useEffect, useState } from "react"
import Image from "next/image"

import { BookType } from "@/types/AladinAPIType"

import StateButton from "@/components/Button/StateButton"
import BookReportButton from "@/components/Button/BookReportButton"

export default function Item({ book }: { book: BookType }) {
    const category = book.categoryName
    const categoryArray = category.split(">")
    const [state, setState] = useState<number>(0)

    useEffect(() => {
        const localBookData = localStorage.getItem(book.isbn13)
        if (localBookData) {
            const { state } = JSON.parse(localBookData)
            setState(parseInt(state))
        }
    }, [])
    return (
        <li className="relative flex flex-col">
            <div className="group relative h-72 w-48">
                <Image src={book.cover} alt={book.title} className="cursor-pointer rounded-lg" quality={100} sizes="20vw" fill={true} />
                <div className="absolute inset-0 rounded-lg bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
                <StateButton state={state} className="absolute right-2 top-2 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <BookReportButton isbn13={book.isbn13} className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            <div className="mt-2 text-sm font-semibold text-main-gray">{categoryArray[1]}</div>
            <div className="line-clamp-2 whitespace-normal text-base font-bold">{book.title.split("-")[0]}</div>
        </li>
    )
}
