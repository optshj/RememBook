import Image from "next/image"

import StateButton from "@/components/Button/StateButton"
import ScrollWrapper from "@/components/Wrapper/ScrollWrapper"
import BookReportButton from "@/components/Button/BookReportButton"

import { BookType } from "@/types/AladinAPIType"

export default function Home() {
    return (
        <div>
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
    const response = await fetch(
        `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${process.env.NEXT_PUBLIC_ALADIN_TTB_KEY}&QueryType=${queryType}&cover=big&Version=20131101&SearchTarget=Book&output=js`
    )
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
            <div className="relative w-48 h-72">
                <Image src={book.cover} alt={book.title} className="rounded-lg" quality={100} sizes="20vw" priority={true} fill={true} />
                <StateButton className="absolute z-10 top-2 right-2" />
                <BookReportButton isbn13={book.isbn13} />
            </div>
            <div className="mt-2 text-sm font-semibold text-main-gray">{categoryArray[1]}</div>
            <div className="text-base font-bold whitespace-normal line-clamp-2">{book.title.split("-")[0]}</div>
        </li>
    )
}
