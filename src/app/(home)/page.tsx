import { BookType } from "@/types/AladinAPIType"

import KakaoAuthHandler from "./_components/KakaoAuthHandler"
import ScrollWrapper from "@/components/Wrapper/ScrollWrapper"
import Item from "./_components/Item"
import Loading from "./loading"
import { Suspense } from "react"

export default function Home({ searchParams }: { searchParams: { [key: string]: string } }) {
    const code = searchParams.code
    return (
        <div>
            <KakaoAuthHandler code={code} />
            <Suspense fallback={<Loading />}>
                <MainItemList queryType="Bestseller" title="베스트셀러!" />
                <MainItemList queryType="ItemNewSpecial" title="주목할만한 신간" />
                <MainItemList queryType="BlogBest" title="블로그 베스트" />
            </Suspense>
        </div>
    )
}

interface MainItemListProps {
    title: string
    queryType: string
}
async function MainItemList({ title, queryType }: MainItemListProps) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/aladin/querytype`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ queryType }),
        cache: "no-store"
    })
    let data = await response.text()
    if (data.endsWith(";")) {
        data = data.slice(0, -1)
    }
    const books: BookType[] = await JSON.parse(data).item
    return (
        <div className="relative flex flex-col gap-4">
            <div className="text-2xl font-bold ">{title}</div>
            <div className="relative">
                <ScrollWrapper>
                    {books.map((book: BookType) => (
                        <Item key={book.isbn} book={book} />
                    ))}
                </ScrollWrapper>
            </div>
        </div>
    )
}
