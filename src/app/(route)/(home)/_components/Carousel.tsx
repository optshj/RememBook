"use client"
import { useEffect, useState } from "react"
import Image from "next/image"

import BigImage1 from "@/../public/images/image1_big.jpg"
import BigImage2 from "@/../public/images/image2_big.jpg"
import BigImage3 from "@/../public/images/image3_big.jpg"
import BigImage4 from "@/../public/images/image4_big.jpg"
import BigImage5 from "@/../public/images/image5_big.jpg"

import SmallImage1 from "@/../public/images/image1_small.jpg"
import SmallImage2 from "@/../public/images/image2_small.jpg"
import SmallImage3 from "@/../public/images/image3_small.jpg"
import SmallImage4 from "@/../public/images/image4_small.jpg"
import SmallImage5 from "@/../public/images/image5_small.jpg"

const bigImages = [BigImage1, BigImage2, BigImage3, BigImage4, BigImage5]
const smallImages = [SmallImage1, SmallImage2, SmallImage3, SmallImage4, SmallImage5]

export default function Carousel() {
    const imageCnt = bigImages.length
    const [currentIndex, setCurrentIndex] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % imageCnt)
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="-mx-6 mb-8 sm:mx-0 sm:w-full">
            <ul className="relative hidden overflow-hidden rounded-xl sm:flex">
                <div className="flex transition-transform duration-1000" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {bigImages.map((image, index) => (
                        <Item key={index} src={image.src} />
                    ))}
                </div>
                <div className="absolute bottom-4 right-6 rounded-full bg-black/50 px-4 py-1 text-sm text-white">
                    {currentIndex + 1}/{imageCnt}
                </div>
            </ul>
            <ul className="relative flex overflow-hidden sm:hidden">
                <div className="flex transition-transform duration-1000" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {smallImages.map((image, index) => (
                        <Item key={index} src={image.src} />
                    ))}
                </div>
                <div className="absolute bottom-4 right-6 rounded-full bg-black/50 px-4 py-1 text-sm text-white">
                    {currentIndex + 1}/{imageCnt}
                </div>
            </ul>
        </div>
    )
}
function Item({ src }: { src: string }) {
    return (
        <li className="w-full flex-shrink-0">
            <Image src={src} alt="frame" width={1500} height={600} quality={100} loading="eager" />
        </li>
    )
}
