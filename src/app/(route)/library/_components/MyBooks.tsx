import { useState } from "react"

import { CombinedBookType } from "@/app/_types/BookType"

import TitleText from "@/app/_components/Text/TitleText"
import ItemImage from "@/app/_components/Items/ItemImage"

export default function MyBooks({ bookList }: { bookList: CombinedBookType[] }) {
    const [state, setState] = useState(3)

    return (
        <div className="flex flex-1 flex-col gap-6">
            <div className="flex justify-between gap-6 sm:justify-start">
                <TitleText>{"내가 저장한 책📚"}</TitleText>
                <div className="hidden gap-6 sm:flex">
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
                <button className="font-semibold text-zinc-500 sm:hidden">{"전체보기"}</button>
            </div>
            {bookList.length === 0 ? (
                <div className="m-auto text-xl font-semibold text-main-gray">{"책장이 비어있네요!"}</div>
            ) : (
                <ul className="flex gap-4 overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-4">
                    {bookList
                        .filter(item => state === 3 || item.state === state)
                        .map(item => (
                            <Item key={item.isbn13} book={item} />
                        ))}
                </ul>
            )}
        </div>
    )
}

function Item({ book }: { book: CombinedBookType }) {
    return (
        <li className="mb-6 flex w-40 flex-col">
            <ItemImage book={book} state={book.state} className="h-60 w-40" />
            <h1 className="mt-2 line-clamp-1 whitespace-normal font-bold">{book.title.split("-")[0]}</h1>
            <h2 className="line-clamp-1 whitespace-normal font-semibold text-main-gray">{book.author}</h2>
        </li>
    )
}
