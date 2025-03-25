"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { useAppSelector } from "@/app/_store/Provider"

export default function TextArea({ isbn13, className = "" }: { isbn13: string; className: string }) {
    const [isSaved, setIsSaved] = useState(false)
    const [text, setText] = useState("")
    const bookData = useAppSelector(state => state.bookData)
    const router = useRouter()

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
        setTimeout(() => setIsSaved(false), 1000)
    }

    return (
        <div className={`relative ${className}`}>
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
            <div className="mt-2 flex justify-center gap-2 font-bold text-white">
                <button className={`flex w-24 items-center justify-center rounded-lg bg-mocha py-1`} onClick={handleSave}>
                    {"저장"}
                </button>
                <button className={`flex w-24 items-center justify-center rounded-lg bg-main-gray py-1`} onClick={() => router.back()}>
                    {"닫기"}
                </button>
            </div>
        </div>
    )
}
