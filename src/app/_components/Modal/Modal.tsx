"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Modal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const router = useRouter()
    useEffect(() => {
        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = originalOverflow
        }
    }, [])

    const closeModal = () => {
        router.back()
    }

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 ${className}`} onClick={closeModal}>
            <div onClick={e => e.stopPropagation()}>{children}</div>
        </div>
    )
}
