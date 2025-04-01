"use client"
import { useEffect } from "react"

export default function PreventPress() {
    useEffect(() => {
        const disableContextMenu = (e: MouseEvent) => {
            e.preventDefault()
        }
        window.addEventListener("contextmenu", disableContextMenu)
        return () => {
            window.removeEventListener("contextmenu", disableContextMenu)
        }
    }, [])
    return null
}
