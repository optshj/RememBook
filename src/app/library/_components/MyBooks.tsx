import { useState } from "react"
import Image from "next/image"

import { CombinedBookType } from "@/types/BookType"

import TitleText from "@/app/_components/Text/TitleText"
import StateButton from "@/app/_components/Button/StateButton"
import BookReportButton from "@/app/_components/Button/BookReportButton"

export default function MyBooks({ bookList }: { bookList: CombinedBookType[] }) {
    const [state, setState] = useState(3)

    return (
        <div className="flex flex-1 flex-col gap-6">
            <div className="flex items-end gap-6">
                <TitleText>{"내가 저장한 책📚"}</TitleText>
                <button className={`text-lg font-semibold ${state == 3 ? "text-mocha" : "text-main-gray"}`} onClick={() => setState(3)}>
                    {"전체"}
                </button>
                <button className={`text-lg font-semibold ${state == 0 ? "text-mocha" : "text-main-gray"}`} onClick={() => setState(0)}>
                    {"시작전"}
                </button>
                <button className={`text-lg font-semibold ${state == 1 ? "text-mocha" : "text-main-gray"}`} onClick={() => setState(1)}>
                    {"읽는중"}
                </button>
                <button className={`text-lg font-semibold ${state == 2 ? "text-mocha" : "text-main-gray"}`} onClick={() => setState(2)}>
                    {"완료"}
                </button>
            </div>
            {bookList.length === 0 ? (
                <div className="m-auto text-xl font-semibold text-main-gray">{"책장이 비어있네요!"}</div>
            ) : (
                <div className="grid grid-cols-4 gap-4">
                    {bookList
                        .filter(item => state === 3 || item.state === state)
                        .map(item => (
                            <Item key={item.isbn13} book={item} />
                        ))}
                </div>
            )}
        </div>
    )
}

function Item({ book }: { book: CombinedBookType }) {
    return (
        <div className="mb-6 flex flex-col">
            <div className="group relative h-64 w-44">
                <Image src={book.cover} alt={book.title} className="cursor-pointer rounded-lg" quality={100} sizes="20vw" fill={true} />
                <div className="absolute inset-0 rounded-lg bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
                <StateButton state={book.state} className="absolute right-2 top-2 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <BookReportButton isbn13={book.isbn13} className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            <div className="mt-2 line-clamp-1 whitespace-normal font-bold">{book.title.split("-")[0]}</div>
            <div className="line-clamp-1 whitespace-normal font-semibold text-main-gray">{book.author}</div>
        </div>
    )
}
