import React, { useEffect, useState } from "react"

export function useRipple<T extends HTMLElement>(ref: React.RefObject<T>) {
    const [ripples, setRipples] = useState<{ left: number; top: number; id: number }[]>([])

    useEffect(() => {
        if (ref.current) {
            const element = ref.current

            const handleClick = (e: MouseEvent) => {
                const rect = element.getBoundingClientRect()
                const left = e.clientX - rect.left
                const top = e.clientY - rect.top
                const id = Date.now()

                setRipples([...ripples, { left, top, id }])
            }

            element.addEventListener("click", handleClick)
            return () => element.removeEventListener("click", handleClick)
        }
        return () => {}
    }, [ref, ripples])

    return ripples.map(({ left, top, id }) => (
        <span
            key={id}
            className="absolute -translate-x-1/2 -translate-y-1/2 animate-ripple overflow-hidden rounded-full bg-white"
            style={{
                left,
                top
            }}
        />
    ))
}
