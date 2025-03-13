import { useState } from "react"

import { CombinedBookType } from "@/types/BookType"

import TitleText from "@/app/_components/Text/TitleText"
import ItemImage from "@/app/_components/Items/ItemImage"

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
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
        <li className="mb-6 flex flex-col">
            <ItemImage book={book} state={book.state} className="h-64 w-44" />
            <h1 className="mt-2 line-clamp-1 whitespace-normal font-bold">{book.title.split("-")[0]}</h1>
            <h2 className="line-clamp-1 whitespace-normal font-semibold text-main-gray">{book.author}</h2>
        </li>
    )
}
