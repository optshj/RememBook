"use client"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import ItemList from "./components/ItemList"
import Loading from "./loading"

export default function Result() {
    const searchParams = useSearchParams()
    const query = searchParams.get("query") || ""
    const [books, setBooks] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true)
            const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/aladin/searchbook`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query })
            })
            const data = await res.json()
            setBooks(data.item)
            setLoading(false)
        }

        if (query) fetchBooks()
    }, [query])

    if (loading) return <Loading />

    return books.length === 0 ? (
        <div className="text-md mt-10 flex w-full flex-col items-center justify-center gap-1 font-semibold sm:text-xl">
            <p>
                <span className="text-red-500">{`\`${query}\``}</span>
                {`에 대한 검색 결과가 없습니다.`}
            </p>
            <p>{"다른 검색어를 입력하시거나"}</p>
            <p>{"철자와 띄어쓰기를 확인해보세요."}</p>
        </div>
    ) : (
        <ItemList books={books} />
    )
}
