"use client"
import { useState } from "react"
import Image from "next/image"

import TitleText from "./TitleText"

export default function MyBooks() {
    const [state, setState] = useState(0)
    return (
        <div className="flex flex-col flex-1 gap-6">
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
            <div className="grid grid-cols-4">
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
            </div>
        </div>
    )
}

function Item() {
    return (
        <div className="flex flex-col mb-6">
            <div className="relative h-64 w-44">
                <Image src="/image/book.jpg" className="rounded-lg shadow-xl" fill sizes="20vw" alt="책이미지" />
            </div>
            <div className="mt-2 text-lg font-bold">{"소년이 온다"}</div>
            <div className="text-lg font-semibold text-main-gray">{"한강"}</div>
        </div>
    )
}
