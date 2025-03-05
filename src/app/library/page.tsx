"use client"
import { useEffect, useState } from "react"

import MyBooks from "./_components/MyBooks"
import CircleChart from "./_components/CircleChart"
import History from "./_components/History"
import BarChart from "./_components/BarChart"

import { BookType } from "@/types/AladinAPIType"
import { LocalBookType, CombinedBookType } from "@/types/BookType"

export default function Library() {
    const [localList, setLocalList] = useState<LocalBookType[]>([])
    const [bookList, setBookList] = useState<BookType[]>([])
    const [combinedList, setCombinedList] = useState<CombinedBookType[]>([])

    useEffect(() => {
        const getIsbnItems = (): LocalBookType[] => {
            return Object.keys(localStorage)
                .filter(key => !isNaN(Number(key)))
                .map(key => {
                    const value = localStorage.getItem(key)
                    if (value) {
                        try {
                            const parsedValue = JSON.parse(value)
                            return {
                                isbn13: key,
                                state: parsedValue.state,
                                rating: parsedValue.rating,
                                date: parsedValue.date
                            }
                        } catch (error) {
                            console.error("localStorage parsing error", error)
                            return null
                        }
                    }
                    return null
                })
                .filter((item): item is LocalBookType => item !== null)
        }
        setLocalList(getIsbnItems())
    }, [])

    const fetchBook = async (isbn13: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/aladin/searchbook`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ isbn13 })
            })
            const data = await response.json()
            return data.item[0]
        } catch (error) {
            console.error(error)
            return null
        }
    }

    useEffect(() => {
        if (localList.length === 0) return

        const fetchBooks = async () => {
            const bookPromises = localList.map(item => fetchBook(item.isbn13))
            const books = await Promise.all(bookPromises)
            setBookList(books.filter(book => book !== null))
        }
        fetchBooks()
    }, [localList])

    useEffect(() => {
        if (localList.length === 0 || bookList.length === 0) return

        const mergedList = localList
            .map(isbnItem => {
                const book = bookList.find(book => book.isbn13 === isbnItem.isbn13)
                return book ? { ...isbnItem, ...book } : null
            })
            .filter((item): item is CombinedBookType => item !== null)

        setCombinedList(mergedList)
    }, [localList, bookList])

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row justify-between gap-4 items-center">
                <CircleChart bookList={combinedList} />
                <BarChart bookList={combinedList} />
            </div>
            <div className="flex flex-row justify-between gap-4">
                <MyBooks bookList={combinedList} />
                <History bookList={combinedList} />
            </div>
        </div>
    )
}
