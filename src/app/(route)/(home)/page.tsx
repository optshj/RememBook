import { Suspense } from "react"

import { BookType } from "@/app/_types/AladinAPIType"

import KakaoAuthHandler from "./_components/KakaoAuthHandler"
import Loading from "./loading"
import Item from "./_components/Item"
import ScrollWrapper from "@/app/_components/Wrapper/ScrollWrapper"
import TitleText from "@/app/_components/Text/TitleText"
import Carousel from "./_components/Carousel"

export default function Home({ searchParams }: { searchParams: { [key: string]: string } }) {
    // const code = searchParams.code
    return (
        <Suspense fallback={<Loading />}>
            {/* <KakaoAuthHandler code={code} /> */}
            <Carousel />
            <MainItemList queryType="Bestseller" title="베스트셀러!" />
            <MainItemList queryType="ItemNewSpecial" title="읽어볼 만한 따끈따끈한 신간" />
            <MainItemList queryType="BlogBest" title="이달의 눈여겨볼 책" />
            <MainItemList queryType="ItemNewAll" title="새롭게 선보이는 책들" />
        </Suspense>
    )
}

interface MainItemListProps {
    title: string
    queryType: string
    loading?: "eager" | "lazy"
    category?: number
}
async function MainItemList({ title, queryType, loading = "lazy", category }: MainItemListProps) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/aladin/querytype?queryType=${queryType}&category=${category}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store"
    })
    const data = await response.json()
    const books: BookType[] = data.item
    return (
        <div className="relative mb-10 flex flex-col gap-4">
            <TitleText>{title}</TitleText>
            <ScrollWrapper>
                {books.map((book: BookType) => (
                    <Item key={book.isbn} book={book} loading={loading} />
                ))}
            </ScrollWrapper>
        </div>
    )
}
