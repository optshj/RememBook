"use client"
import Loading from "./loading"
import { useEffect, useState } from "react"

import { MdOutlineRefresh } from "react-icons/md"

import { BookType } from "@/app/_types/AladinAPIType"

import ItemImage from "@/app/_components/Items/ItemImage"

export default function Recommend() {
    const maxResults = 50
    const [rand, setRand] = useState(Math.floor(Math.random() * maxResults))
    const [books, setBooks] = useState<BookType[]>([])
    const [book, setBook] = useState<BookType | null>()

    const fetchBook = async () => {
        const response = await fetch("/api/aladin/querytype", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ queryType: "Bestseller", maxResults: maxResults }),
            cache: "no-cache"
        })
        const data = await response.json()
        setBooks(data.item)
        setBook(data.item[rand])
    }
    useEffect(() => {
        fetchBook()
    }, [])
    useEffect(() => {
        if (books.length > 0) {
            setBook(books[rand])
        }
    }, [rand])

    const encodeHTML = (str: string) => {
        const parser = new DOMParser()
        const encodedString = parser.parseFromString(str, "text/html").documentElement.textContent
        return encodedString
    }
    const shortCategory = book?.categoryName.split(">").slice(-1)[0]

    return (
        <>
            {book ? (
                <div className="fixed inset-0 top-12 mb-16 flex w-screen overflow-y-auto bg-white p-10 font-semibold sm:relative sm:h-[calc(100vh-220px)] sm:w-auto sm:rounded-2xl sm:shadow-lg">
                    <button
                        className="absolute right-5 top-10 z-10 flex items-center gap-2 rounded-full bg-mocha p-2 text-white"
                        onClick={() => setRand(Math.floor(Math.random() * maxResults))}>
                        <MdOutlineRefresh className="h-6 w-6" />
                        <span className="hidden sm:inline">{"새로고침"}</span>
                    </button>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="flex justify-center bg-cover" style={{ backgroundImage: `url(${book.cover})` }}>
                            <div className="absolute inset-0 z-0 backdrop-blur-3xl sm:backdrop-blur-none" />
                            <ItemImage book={book} state={0} className="h-72 w-48 flex-shrink-0 sm:h-96 sm:w-64" />
                        </div>
                        <div className="z-10 mt-4 flex w-full flex-col gap-1 text-lg">
                            <p className="line-clamp-1 text-2xl">{book.title.split("-")[0]}</p>
                            <p className="line-clamp-1 text-main-gray">{book.author}</p>
                            <p className="line-clamp-2 hidden text-main-gray sm:inline">{book.categoryName}</p>
                            <p className="text-main-gray sm:hidden">{shortCategory}</p>
                            <p className="line-clamp-1 font-normal text-main-gray">
                                {book.publisher} · {book.pubDate}
                            </p>
                            <p className="mt-4 sm:line-clamp-3">{encodeHTML(book.description)}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}
