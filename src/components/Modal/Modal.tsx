"use client"
import { useRouter } from "next/navigation"

export default function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    const closeModal = () => {
        router.back()
        setTimeout(() => {
            router.refresh()
        }, 100)
    }
    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/50" onClick={closeModal}>
            <div onClick={stopPropagation}>{children}</div>
        </div>
    )
}
