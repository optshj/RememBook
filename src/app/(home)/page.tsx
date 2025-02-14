import Image from "next/image"

import StateButton from "@/components/Button/StateButton"
import ScrollWrapper from "@/components/Wrapper/ScrollWrapper"
import BookReportButton from "@/components/Button/BookReportButton"

import { BookType } from "@/types/AladinAPIType"
import KakaoAuthHandler from "./_components/KakaoAuthHandler"

export default function Home({ searchParams }: { searchParams: { [key: string]: string } }) {
    const code = searchParams.code
    return (
        <div>
            <KakaoAuthHandler code={code} />
            <MainItemList queryType="Bestseller" title="베스트셀러!" />
            <MainItemList queryType="ItemNewSpecial" title="주목할만한 신간" />
            <MainItemList queryType="BlogBest" title="블로그 베스트" />
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

function Item({ book }: { book: BookType }) {
    const category = book.categoryName
    const categoryArray = category.split(">")
    return (
        <li className="relative flex flex-col w-44 min-h-96">
            <div className="relative w-48 h-72 group">
                <Image src={book.cover} alt={book.title} className="rounded-lg cursor-pointer" quality={100} sizes="20vw" priority={true} fill={true} />
                <div className="absolute inset-0 bg-black opacity-0 rounded-lg group-hover:opacity-30 transition-opacity duration-300" />
                <StateButton className="absolute z-10 top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <BookReportButton isbn13={book.isbn13} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="mt-2 text-sm font-semibold text-main-gray">{categoryArray[1]}</div>
            <div className="text-base font-bold whitespace-normal line-clamp-2">{book.title.split("-")[0]}</div>
        </li>
    )
}
