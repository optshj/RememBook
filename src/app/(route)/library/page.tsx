"use client"
import { useEffect, useState } from "react"

import { LocalBookType, CombinedBookType } from "@/app/_types/BookType"
import { BookType } from "@/app/_types/AladinAPIType"

import MyBooks from "./_components/MyBooks"
import CircleChart from "./_components/CircleChart"
import History from "./_components/History"
import BookReport from "./_components/BookReport"
import Loading from "./loading"

export default function Library() {
    const [combinedList, setCombinedList] = useState<CombinedBookType[]>([])
    const [loading, setLoading] = useState(true)

    // Fetch data from localStorage
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

    // Fetch book details from API
    const fetchBook = async (isbn13List: string[]) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/aladin/searchbookList`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isbn13List }),
                cache: "no-store"
            })
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error)
            return null
        }
    }

    // Single useEffect to handle all data fetching and combining
    useEffect(() => {
        const loadData = async () => {
            setLoading(true)

            // Step 1: Get local storage data
            const localList = getIsbnItems()
            if (localList.length === 0) {
                setCombinedList([])
                setLoading(false)
                return
            }

            // Step 2: Fetch book data from API
            const isbn13List = localList.map(item => item.isbn13)
            const books: BookType[] = await fetchBook(isbn13List)

            // Step 3: Combine local and API data
            const mergedList = localList
                .map(isbnItem => {
                    const book = books.find(book => book.isbn13 === isbnItem.isbn13)
                    return book ? { ...isbnItem, ...book } : null
                })
                .filter((item): item is CombinedBookType => item !== null)

            setCombinedList(mergedList)
            setLoading(false)
        }
        loadData()
    }, [])

    if (loading) {
        return <Loading />
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row">
                <CircleChart bookList={combinedList} />
                <BookReport bookList={combinedList} />
            </div>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <MyBooks bookList={combinedList} />
                <History bookList={combinedList} />
            </div>
        </div>
    )
}
