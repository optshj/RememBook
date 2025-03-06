import Tooltip from "@/components/Tooltip/Tooltip"
import { useRef } from "react"
import { FaStar } from "react-icons/fa6"

interface RatingProp {
    className?: string
    rating: number
    setRating: (rating: number) => void
}

export default function Rating({ className, rating, setRating }: RatingProp) {
    const containerRef = useRef<HTMLDivElement>(null)

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return

        const { left } = containerRef.current.getBoundingClientRect()
        const clickX = event.clientX - left
        const starWidth = containerRef.current.clientWidth / 5
        const newRating = Math.min(5, Math.max(1, Math.ceil(clickX / starWidth)))

        setRating(newRating)
    }

    return (
        <div ref={containerRef} className={`absolute z-50 cursor-pointer rounded-md bg-white font-normal shadow-lg ${className}`} onClick={handleClick}>
            <div className="flex flex-row p-2">
                {[1, 2, 3, 4, 5].map(i => (
                    <Tooltip key={i} content={i.toString()}>
                        <FaStar key={i} className={`${i < rating + 1 && "text-yellow"}`} />
                    </Tooltip>
                ))}
            </div>
        </div>
    )
}
;``
