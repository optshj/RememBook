import Image from "next/image"

import StateButton from "@/components/Button/StateButton"
import ScrollWrapper from "./ScrollWrapper"

import { BookType } from "@/types/AladinAPIType"
import BookReportButton from "../Button/BookReportButton"

interface MainItemListProps {
    title: string
    queryType: string
}
export default async function MainItemList({ title, queryType }: MainItemListProps) {
    const response = await fetch(
        `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${process.env.NEXT_PUBLIC_ALADIN_TTB_KEY}&QueryType=${queryType}&cover=big&Version=20131101&SearchTarget=Book&output=js`
    )
    let data = await response.text()
    if (data.endsWith(";")) {
        data = data.slice(0, -1)
    }
    const books = await JSON.parse(data).item

    return (
        <div className="relative flex flex-col max-w-5xl gap-4 m-auto">
            <div className="mt-3 text-2xl font-bold">{title}</div>
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

function Item({ book }: { book: any }) {
    const isbn13digit = book.isbn13.split(" ").pop()

    const dashIndex = book.title.indexOf("-")

    return (
        <li className="relative flex flex-col w-44">
            <div className="relative w-48 h-72">
                <Image src={book.cover} alt={book.title} className="rounded-lg" quality={100} sizes="20vw" priority={true} fill={true} />
                <StateButton className="absolute z-10 top-2 right-2" />
                <BookReportButton isbn13digit={isbn13digit} />
            </div>
            <div className="mt-2 text-sm font-semibold whitespace-normal">{book.title.slice(0, dashIndex)}</div>
            <div className="text-sm whitespace-normal text-main-gray">{book.author}</div>
        </li>
    )
}
