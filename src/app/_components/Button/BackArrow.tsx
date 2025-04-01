"use client"
import { useRouter } from "next/navigation"

import { IoChevronBack } from "react-icons/io5"

export default function BackArrow({ className }: { className?: string }) {
    const router = useRouter()
    const onClick = () => {
        router.back()
    }
    return <IoChevronBack className={`h-6 w-6 cursor-pointer text-black ${className}`} onClick={onClick} />
}
