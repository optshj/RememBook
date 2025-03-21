"use client"
import { useEffect, useState } from "react"

import CommonButton from "@/app/_components/Button/CommonButton"
import BackButton from "@/app/_components/Button/BackButton"

import { useAppSelector } from "@/app/_store/Provider"

export default function TextArea({ isbn13 }: { isbn13: string }) {
    const [isSaved, setIsSaved] = useState(false)
    const [text, setText] = useState("")
    const bookData = useAppSelector(state => state.bookData)

    useEffect(() => {
        const localBookData = localStorage.getItem(isbn13)
        if (localBookData) {
            const parsedData = JSON.parse(localBookData)
            setText(parsedData.text)
        }
    }, [isbn13])

    const handleSave = () => {
        const newBookData = {
            ...bookData,
            text
        }
        localStorage.setItem(isbn13, JSON.stringify(newBookData))
        setIsSaved(true)
    }

    return (
        <div className="relative">
            <div
                className={`pointer-events-none absolute bottom-1/2 left-1/2 -translate-x-1/2 transform rounded-lg bg-mocha px-4 py-2 text-sm font-bold text-white transition-all duration-500 ${
                    isSaved ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}>
                {"저장되었습니다!"}
            </div>
            <textarea
                className="h-60 w-full resize-none rounded-lg bg-zinc-100 p-4 text-left align-top text-black"
                placeholder="독후감을 작성해주세요. (500자 이내)"
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <div className="mt-2 flex justify-center gap-2">
                <CommonButton onClick={handleSave}>{"저장하기"}</CommonButton>
                <BackButton color="main-gray">{"닫기"}</BackButton>
            </div>
        </div>
    )
}
