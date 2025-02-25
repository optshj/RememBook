import { useState, useRef } from "react"
import { FaStar } from "react-icons/fa6"

interface RatingProp {
    className?: string
    setRating: (rating: number) => void
}

export default function Rating({ className, setRating }: RatingProp) {
    const containerRef = useRef<HTMLDivElement>(null)

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return

        const { left } = containerRef.current.getBoundingClientRect()
        const clickX = event.clientX - left
        const starWidth = containerRef.current.clientWidth / 5
        let rating = Math.min(5, Math.max(0, (clickX / starWidth) * 2))

        // ✅ 0.5 단위 점수 변환: 홀수는 내림, 짝수는 유지
        rating = Math.floor(rating) % 2 === 0 ? Math.floor(rating) / 2 : Math.floor(rating) / 2 + 0.5

        setRating(rating)
    }

    return (
        <div ref={containerRef} className={`absolute z-50 bg-white shadow-lg rounded-md font-normal ${className}`} onClick={handleClick}>
            <div className="flex flex-row p-2">
                {[0, 1, 2, 3, 4].map(i => (
                    <FaStar key={i} />
                ))}
            </div>
        </div>
    )
}
