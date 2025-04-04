import React, { useEffect, useState } from "react"

/**
 * @example const deleteRef = useRef<HTMLLIElement>(null)
    const addMessageElement = useShowMessage(addRef, "서재에 추가했어요")
 * @param ref : React.RefObject<T>
 * @param message : string
 * 
 * @returns JSX.Element | null
 */
export function useShowMessage<T extends HTMLElement>(ref: React.RefObject<T>, message: string = "처리되었습니다") {
    const [messages, setMessages] = useState<{ id: number }[]>([])

    useEffect(() => {
        if (!ref.current) return

        const handleClick = () => {
            const id = Date.now()
            setMessages([...messages, { id }])
        }

        const element = ref.current
        element.addEventListener("click", handleClick)
        return () => element.removeEventListener("click", handleClick)
    }, [ref, message, messages])

    return messages.map(({ id }) => (
        <div
            key={id}
            className={`animate-fade-up-down pointer-events-none fixed left-1/2 top-1/2 z-50 -translate-x-1/2 rounded-lg bg-mocha px-4 py-2 font-bold text-white shadow-lg`}>
            {message}
        </div>
    ))
}
