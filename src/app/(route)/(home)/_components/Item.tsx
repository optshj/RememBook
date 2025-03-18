"use client"
import { useEffect, useState } from "react"

import { BookType } from "@/app/_types/AladinAPIType"

import ItemImage from "@/app/_components/Items/ItemImage"

interface ItemProps {
    book: BookType
    loading?: "eager" | "lazy"
}
export default function Item({ book, loading = "lazy" }: ItemProps) {
    const [state, setState] = useState<number>(0)
    const category = book.categoryName.split(">")[1]

    useEffect(() => {
        const localBookData = localStorage.getItem(book.isbn13)
        if (localBookData) {
            const { state } = JSON.parse(localBookData)
            setState(parseInt(state))
        }
    }, [book.isbn13])

    return (
        <li className="flex flex-col">
            <ItemImage book={book} state={state} loading={loading} className="h-48 w-32 sm:h-72 sm:w-48" />
            <h2 className="mt-2 text-sm font-semibold text-zinc-500">{category}</h2>
            <h1 className="line-clamp-2 whitespace-normal text-base font-bold">{book.title.split("-")[0]}</h1>
        </li>
    )
}
