"use client"
import { useState, useEffect, useRef, useCallback } from "react"

import { BookType } from "@/app/_types/AladinAPIType"

import { addItem } from "@/app/_hooks/useLocalStorageBook"

import { FaStar } from "react-icons/fa6"
import { AiOutlineLoading } from "react-icons/ai"

import StateButton from "@/app/_components/Button/StateButton"
import AddLibraryButton from "@/app/_components/Button/AddLibraryButton"
import BookReportButton from "@/app/_components/Button/BookReportButton"
import ItemImage from "@/app/_components/Items/ItemImage"

export default function ItemList({ books }: { books: BookType[] }) {
    const [items, setItems] = useState<BookType[]>(books.slice(0, 12))
    const [loading, setLoading] = useState(false)
    const observerRef = useRef<HTMLDivElement | null>(null)
    const pageRef = useRef(1)
    const hasMore = items.length < books.length

    const fetchMoreBooks = useCallback(() => {
        if (loading) return
        setLoading(true)

        setTimeout(() => {
            const nextPage = pageRef.current + 1
            const newItems = books.slice(0, nextPage * 12)

            setItems(newItems)
            pageRef.current = nextPage
            setLoading(false)
        }, 1000)
    }, [books, loading])

    useEffect(() => {
        if (!hasMore) return
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
    }, [fetchMoreBooks, hasMore])

    return (
        <ul className="xs:w-[512px] 2xs:w-[416px] m-auto w-[312px] sm:flex sm:w-auto sm:flex-col sm:gap-2">
            <div className="text-2xl font-semibold sm:ml-4">
                <span>{"도서 "}</span>
                <span className="text-xl text-mocha">{books.length}</span>
            </div>
            {items.map((book: BookType) => (
                <Item book={book} key={book.isbn13} />
            ))}
            <div ref={observerRef} className="flex h-20 w-full items-center justify-center">
                {loading && <AiOutlineLoading className="h-12 w-12 animate-spin text-gray-200" />}
            </div>
        </ul>
    )
}

function Item({ book }: { book: BookType }) {
    const [data, setData] = useState({ rating: 0, date: "", state: 0 })
    useEffect(() => {
        const localBookData = localStorage.getItem(book.isbn13)
        if (localBookData) {
            setData(JSON.parse(localBookData))
        }
    }, [book.isbn13])

    return (
        <li className="xs:w-[120px] m-1 my-3 inline-block w-24 sm:flex sm:w-auto sm:flex-row sm:gap-2 sm:border-b-2">
            <ItemImage book={book} state={data.state} className="xs:h-44 xs:w-[120px] h-36 w-24 flex-shrink-0 sm:m-4 sm:h-72 sm:w-48" />
            <div className="flex flex-col text-sm font-semibold text-main-gray sm:my-10 sm:gap-2">
                <div className="line-clamp-1 whitespace-normal text-base font-bold text-black sm:text-lg">{book.title.split("-")[0]}</div>
                <div className="line-clamp-1 whitespace-normal">{book.author}</div>
                <div className="line-clamp-1 hidden whitespace-normal sm:inline-block">{book.categoryName}</div>
                <div className="mt-6 hidden flex-row sm:flex">
                    <div className="mr-2 flex flex-col gap-2">
                        {["나의평가", "읽은기간", "상태"].map(label => (
                            <div key={label}>{label}</div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1 text-yellow">
                            <FaStar />
                            {data.rating || "비어있음"}
                        </div>
                        <div>{data.date || "비어있음"}</div>
                        <StateButton state={data.state} />
                    </div>
                </div>
            </div>
            <div className="ml-auto mr-5 hidden flex-col justify-center gap-5 sm:flex">
                <AddLibraryButton onClick={() => addItem(book.isbn13)} />
                <BookReportButton isbn13={book.isbn13} large={true} />
            </div>
        </li>
    )
}
