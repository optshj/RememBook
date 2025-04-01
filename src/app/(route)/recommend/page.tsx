"use client"
import { useEffect, useState } from "react"

import { MdOutlineRefresh } from "react-icons/md"

import { BookType } from "@/app/_types/AladinAPIType"
import { LocalBookType } from "@/app/_types/BookType"

import ItemImage from "@/app/_components/Items/ItemImage"
import Loading from "./loading"

const encodeHTML = (str: string) => {
    const parser = new DOMParser()
    const encodedString = parser.parseFromString(str, "text/html").documentElement.textContent
    return encodedString
}
export default function Recommend() {
    const maxResults = 20
    const [rand, setRand] = useState(Math.floor(Math.random() * maxResults))
    const [books, setBooks] = useState<BookType[]>([])
    const [book, setBook] = useState<BookType | null>()
    const [localBookName, setLocalBookName] = useState<string>("")
    const shortCategory = book?.categoryName.split(">").slice(-1)[0]

    const getIsbnItems = (): LocalBookType[] => {
        return Object.entries(localStorage)
            .filter(([key]) => !isNaN(Number(key)))
            .map(([key, value]) => {
                try {
                    const parsedValue = JSON.parse(value)
                    return {
                        isbn13: key,
                        state: parsedValue.state,
                        rating: parsedValue.rating,
                        date: parsedValue.date,
                        categoryId: parsedValue.categoryId,
                        title: parsedValue.title,
                        author: parsedValue.author
                    }
                } catch (error) {
                    console.error("localStorage parsing error", error)
                    return null
                }
            })
            .filter((item): item is LocalBookType => item !== null)
    }

    const fetchBookList = async (queryType: string, category?: string) => {
        const response = await fetch(`/api/aladin/querytype?queryType=${queryType}&maxResults=${maxResults}&category=${category}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            cache: "no-cache"
        })
        const data = await response.json()
        setBooks(data.item)
        setBook(data.item[rand])
    }

    //fetchbook
    useEffect(() => {
        const localList = getIsbnItems()
        if (localList.length > 0) {
            const randomItem = localList[Math.floor(Math.random() * localList.length)]
            setLocalBookName(randomItem.title)
            fetchBookList("ItemEditorChoice", randomItem.categoryId.toString())
        } else {
            fetchBookList("Bestseller")
        }
        setBook(books[rand])
    }, [])
    // if rand changes, set book
    useEffect(() => {
        setBook(books[rand])
    }, [rand])

    return (
        <>
            {book ? (
                <div className="fixed inset-0 top-16 mb-16 flex w-screen overflow-y-auto bg-white p-4 font-semibold sm:relative sm:h-[calc(100vh-220px)] sm:w-auto sm:rounded-2xl sm:p-10 sm:shadow-lg">
                    <button
                        className="absolute right-5 top-10 flex items-center gap-2 rounded-full bg-mocha p-2 text-white"
                        onClick={() => setRand(Math.floor(Math.random() * maxResults))}>
                        <MdOutlineRefresh className="h-6 w-6" />
                        <span className="hidden sm:inline-block">{"새로고침"}</span>
                    </button>
                    <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="mt-10 flex justify-center bg-cover" style={{ backgroundImage: `url(${book.cover})` }}>
                            <div className="absolute inset-0 backdrop-blur-2xl sm:backdrop-blur-none" />
                            <ItemImage book={book} state={0} className="h-72 w-48 flex-shrink-0 sm:h-96 sm:w-64" />
                        </div>
                        <div className="z-10 mt-4 flex w-full flex-col gap-1 text-lg">
                            {localBookName && ( // if localBookName exists, show it
                                <div className="line-clamp-1 sm:text-xl">
                                    <span className="font-bold text-mocha">{localBookName}</span>
                                    {" 랑 비슷한 장르!"}
                                </div>
                            )}
                            <p className="line-clamp-1 text-2xl">{book.title.split("-")[0]}</p>
                            <p className="line-clamp-1 text-main-gray">{book.author || "작가 미상"}</p>
                            <p className="line-clamp-2 hidden text-main-gray sm:inline-block">{book.categoryName || "카테고리 없음"}</p>
                            <p className="text-main-gray sm:hidden">{shortCategory || "카테고리 없음"}</p>
                            <p className="line-clamp-1 text-main-gray">
                                {book.publisher || "출판사 미정"} · {book.pubDate || "출판일 미정"}
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
