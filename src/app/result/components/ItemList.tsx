"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"

import { BookType } from "@/types/AladinAPIType"

import { FaStar } from "react-icons/fa6"

import StateButton from "@/app/_components/Button/StateButton"
import AddLibraryButton from "@/app/_components/Button/AddLibraryButton"
import BookReportButton from "@/app/_components/Button/BookReportButton"

export default function ItemList({ books }: { books: BookType[] }) {
    const [items, setItems] = useState<BookType[]>(books.slice(0, 10))
    const [loading, setLoading] = useState(false)
    const observerRef = useRef<HTMLDivElement | null>(null)
    const pageRef = useRef(1)

    const fetchMoreBooks = useCallback(() => {
        if (loading) return
        setLoading(true)

        setTimeout(() => {
            const nextPage = pageRef.current + 1
            const newItems = books.slice(0, nextPage * 10)

            setItems(newItems)
            pageRef.current = nextPage
            setLoading(false)
        }, 1000)
    }, [books, loading])

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    fetchMoreBooks()
                }
            },
            { threshold: 1.0 }
        )

        if (observerRef.current) observer.observe(observerRef.current)
        return () => observer.disconnect()
    }, [fetchMoreBooks])

    return (
        <div className="flex flex-col gap-2">
            {items.map((book: BookType) => (
                <Item book={book} key={book.isbn13} />
            ))}
            <div ref={observerRef} className="flex h-10 w-full items-center justify-center">
                {loading && <div className="text-lg font-semibold">{"로딩중"}</div>}
            </div>
        </div>
    )
}

function Item({ book }: { book: BookType }) {
    const [state, setState] = useState(0)
    const [date, setDate] = useState("")
    const [rating, setRating] = useState(0)

    useEffect(() => {
        const localBookData = localStorage.getItem(book.isbn13)
        if (localBookData) {
            const { rating, date, state } = JSON.parse(localBookData)
            setRating(rating)
            setDate(date)
            setState(state)
        }
    }, [book.isbn13])
    const addLibrary = () => {
        const localBookData = localStorage.getItem(book.isbn13)
        if (!localBookData) {
            localStorage.setItem(book.isbn13, JSON.stringify({ rating: 0, date: "", state: 0, text: "" }))
        }
    }
    return (
        <div className="flex gap-2 border-b-2">
            <div className="relative m-4 h-72 w-48 rounded-lg">
                <Image src={book.cover} alt={book.title} className="rounded-lg" quality={100} sizes="20vw" fill={true} />
            </div>
            <div className="my-10 flex flex-col gap-2">
                <div className="text-lg font-bold text-black">{book.title.split("-")[0]}</div>
                <div className="font-semibold text-main-gray">{book.author}</div>
                <div className="font-semibold text-main-gray">{book.categoryName}</div>
                <div className="flex flex-row font-semibold text-main-gray">
                    <div className="mr-2 flex flex-col">
                        {["나의평가", "읽은기간", "상태"].map(label => (
                            <div key={label} className="py-1">
                                {label}
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1 p-1 text-yellow">
                            <FaStar />
                            {rating || "비어있음"}
                        </div>
                        <div className="p-1">{date || "비어있음"}</div>
                        <StateButton state={state} className="mx-1 my-2" />
                    </div>
                </div>
            </div>
            <div className="ml-auto mr-5 flex flex-col justify-center gap-5">
                <AddLibraryButton onClick={addLibrary} />
                <BookReportButton isbn13={book.isbn13} large={true} />
            </div>
        </div>
    )
}
