import Image from "next/image"

import { BookType } from "@/types/AladinAPIType"

import StateButton from "@/components/Button/StateButton"
import AddLibraryButton from "@/components/Button/AddLibraryButton"
import BookReportButton from "@/components/Button/BookReportButton"

export default async function Result({ searchParams }: { searchParams: { [key: string]: string } }) {
    const query = searchParams.query
    let books
    let data
    try {
        const response = await fetch(
            `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${process.env.NEXT_PUBLIC_ALADIN_TTB_KEY}&Query=${query}&searchTarget=Book&output=js&Cover=big&sort=SalesPoint`
        )
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

        data = await response.text()
        data = data.replace(/\\[abfnrtv0'"\\]/g, "")
        if (data.endsWith(";")) data = data.slice(0, -1)

        const parsedData = await JSON.parse(data)
        books = parsedData.item
    } catch (error) {
        return <div>데이터를 불러오는 중 문제가 발생했습니다.</div>
    }

    return (
        <div className="flex flex-col gap-2">
            {books.map((book: BookType) => (
                <Item book={book} key={book.isbn13} />
            ))}
        </div>
    )
}

interface ItemProps {
    book: BookType
}
function Item({ book }: ItemProps) {
    return (
        <div className="flex border-b-2 gap-2">
            <div className="w-44 h-72 relative m-4 rounded-lg">
                <Image src={book.cover} alt={book.title} className="rounded-lg" quality={100} sizes="20vw" priority={true} fill={true} />
            </div>
            <div className="flex flex-col my-10 gap-2">
                <div className="font-bold text-black text-lg">{book.title.split("-")[0]}</div>
                <div className="font-semibold text-main-gray text-lg">{book.author}</div>
                <div className="font-semibold text-main-gray text-lg">{book.categoryName}</div>
                <StateButton />
            </div>
            <div className="flex flex-col gap-5 ml-auto justify-center mr-5">
                <AddLibraryButton>{"내 서재에 담기"}</AddLibraryButton>
                <BookReportButton isbn13={book.isbn13} large={true} />
            </div>
        </div>
    )
}
