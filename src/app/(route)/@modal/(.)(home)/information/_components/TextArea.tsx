"use client"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useShowMessage } from "@/app/_hooks/useShowMessage"
import { useAppSelector } from "@/app/_store/Provider"

export default function TextArea({ isbn13, className = "" }: { isbn13: string; className: string }) {
    const [text, setText] = useState("")
    const bookData = useAppSelector(state => state.bookData)
    const router = useRouter()
    const buttonRef = useRef<HTMLButtonElement>(null)
    const addMessage = useShowMessage(buttonRef, "저장되었습니다")

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
    }

    return (
        <>
            <div className={`relative ${className}`}>
                {addMessage}
                <textarea
                    className="h-60 w-full resize-none rounded-lg bg-zinc-100 p-4 text-left align-top text-black"
                    placeholder="독후감을 작성해주세요. (500자 이내)"
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                <div className="mt-2 flex justify-center gap-2 font-bold text-white">
                    <button className={`flex w-24 items-center justify-center rounded-lg bg-mocha py-1`} onClick={handleSave} ref={buttonRef}>
                        {"저장"}
                    </button>
                    <button className={`flex w-24 items-center justify-center rounded-lg bg-main-gray py-1`} onClick={() => router.back()}>
                        {"닫기"}
                    </button>
                </div>
            </div>
        </>
    )
}
