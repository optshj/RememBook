"use client"
import { useEffect, useState } from "react"

import { BookType } from "@/types/AladinAPIType"

import ItemImage from "@/app/_components/Items/ItemImage"

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
            <ItemImage book={book} state={state} className="h-72 w-48" />
            <h2 className="mt-2 text-sm text-main-gray">{categoryArray[1]}</h2>
            <h1 className="line-clamp-2 whitespace-normal text-base font-bold">{book.title.split("-")[0]}</h1>
        </li>
    )
}
