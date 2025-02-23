"use client"
import { useEffect, useState } from "react"

import CommonButton from "@/components/Button/CommonButton"
import BackButton from "@/components/Button/BackButton"

interface TextAreaProps {
    isbn13: string
}

export default function TextArea({ isbn13 }: TextAreaProps) {
    const [isSaved, setIsSaved] = useState(false)
    const [text, setText] = useState("")

    useEffect(() => {
        const localBookData = localStorage.getItem(isbn13 + "text")
        setText(localBookData ? localBookData : "")
    }, [isbn13])

    const handleSave = () => {
        localStorage.setItem(isbn13 + "text", text)
        setIsSaved(true)
        setTimeout(() => setIsSaved(false), 2000)
    }

    return (
        <div className="relative">
            <div
                className={`absolute bottom-1/2 left-1/2 transform -translate-x-1/2 font-bold bg-mocha text-white text-sm px-4 py-2 rounded-lg transition-all duration-500 pointer-events-none ${
                    isSaved ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}>
                {"저장되었습니다!"}
            </div>

            <textarea
                className="w-full p-4 text-left text-black align-top rounded-lg resize-none bg-zinc-100 h-60"
                placeholder="독후감을 작성해주세요. (500자 이내)"
                spellCheck={false}
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <div className="flex justify-center gap-2 mt-2">
                <CommonButton onClick={handleSave}>{"저장하기"}</CommonButton>
                <BackButton color="main-gray">{"닫기"}</BackButton>
            </div>
        </div>
    )
}
