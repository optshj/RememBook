import { Suspense } from "react"

import { BookType } from "@/types/AladinAPIType"

import { GoPlus } from "react-icons/go"

import KakaoAuthHandler from "./_components/KakaoAuthHandler"
import Loading from "./loading"
import Item from "./_components/Item"
import ScrollWrapper from "@/app/_components/Wrapper/ScrollWrapper"
import TitleText from "@/app/_components/Text/TitleText"

export default function Home({ searchParams }: { searchParams: { [key: string]: string } }) {
    const code = searchParams.code
    return (
        <Suspense fallback={<Loading />}>
            <KakaoAuthHandler code={code} />
            <MainItemList queryType="Bestseller" title="베스트셀러! 👍" />
            <MainItemList queryType="ItemNewSpecial" title="주목할만한 신간 🔍" />
            <MainItemList queryType="BlogBest" title="블로그 베스트" />
            <MainItemList queryType="BlogBest" title="블로그 베스트" />
        </Suspense>
    )
}
interface MainItemListProps {
    title: string
    queryType: string
    category?: number
}
async function MainItemList({ title, queryType, category = 0 }: MainItemListProps) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/aladin/querytype`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ queryType, category }),
        cache: "no-store"
    })
    const data = await response.json()
    const books: BookType[] = data.item
    return (
        <div className="relative mb-6 flex flex-col gap-4">
            <div className="flex justify-between">
                <TitleText>{title}</TitleText>
                <button className="flex items-center gap-1 rounded-full p-2 text-sm font-black hover:bg-zinc-100">
                    {"더보기"}
                    <GoPlus />
                </button>
            </div>
            <ScrollWrapper>
                {books.map((book: BookType) => (
                    <Item key={book.isbn} book={book} />
                ))}
            </ScrollWrapper>
        </div>
    )
}
