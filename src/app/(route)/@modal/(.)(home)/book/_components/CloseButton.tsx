"use client"
import { useRouter } from "next/navigation"

export default function CloseButton() {
    const router = useRouter()

    return (
        <div className="relative">
            <div className="mb-10 mt-5 flex justify-center gap-2 font-bold text-white">
                <button className={`flex w-24 items-center justify-center rounded-lg bg-main-gray py-1`} onClick={() => router.back()}>
                    {"닫기"}
                </button>
            </div>
        </div>
    )
}
