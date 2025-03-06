import { Suspense, useState } from "react"
import Image from "next/image"

import { CombinedBookType } from "@/types/BookType"

import TitleText from "@/components/Text/TitleText"

export default function MyBooks({ bookList }: { bookList: CombinedBookType[] }) {
    const [state, setState] = useState(0)

    return (
        <div className="flex flex-1 flex-col gap-6">
            <div className="flex items-end gap-6">
                <TitleText>{"내가 저장한 책📚"}</TitleText>
                <button className={`text-lg font-semibold ${state == 0 ? "text-mocha" : "text-main-gray"}`} onClick={() => setState(0)}>
                    {"전체"}
                </button>
                <button className={`text-lg font-semibold ${state == 1 ? "text-mocha" : "text-main-gray"}`} onClick={() => setState(1)}>
                    {"읽는중"}
                </button>
                <button className={`text-lg font-semibold ${state == 2 ? "text-mocha" : "text-main-gray"}`} onClick={() => setState(2)}>
                    {"시작전"}
                </button>
                <button className={`text-lg font-semibold ${state == 3 ? "text-mocha" : "text-main-gray"}`} onClick={() => setState(3)}>
                    {"완료"}
                </button>
            </div>
            <Suspense fallback={<div>{"로딩 중..."}</div>}>
                {bookList.length === 0 ? (
                    <div className="m-auto text-xl font-semibold text-main-gray">{"책장이 비어있네요!"}</div>
                ) : (
                    <div className="grid grid-cols-4">
                        {bookList
                            .filter(item => state === 0 || item.state === state)
                            .map(item => (
                                <Item key={item.isbn13} data={item} />
                            ))}
                    </div>
                )}
            </Suspense>
        </div>
    )
}

function Item({ data }: { data: CombinedBookType }) {
    return (
        <div className="mb-6 flex flex-col">
            <div className="relative h-64 w-44">
                <Image src={data.cover || ""} className="rounded-lg shadow-xl" fill sizes="20vw" alt="BookImage" />
            </div>
            <div className="mt-2 line-clamp-1 whitespace-normal text-lg font-bold">{data.title.split("-")[0]}</div>
            <div className="line-clamp-1 whitespace-normal text-lg font-semibold text-main-gray">{data.author}</div>
        </div>
    )
}
