"use client"
import { useEffect, useState } from "react"
import Image from "next/image"

import BigImage1 from "@/../public/images/image1_big.jpg"
import BigImage2 from "@/../public/images/image2_big.jpg"
import BigImage3 from "@/../public/images/image3_big.jpg"
import BigImage4 from "@/../public/images/image4_big.jpg"

import SmallImage1 from "@/../public/images/image1_small.jpg"
import SmallImage2 from "@/../public/images/image2_small.jpg"
import SmallImage3 from "@/../public/images/image3_small.jpg"
import SmallImage4 from "@/../public/images/image4_small.jpg"

export default function Carousel() {
    const imageCnt = 4
    const [currentIndex, setCurrentIndex] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % imageCnt)
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <>
            <ul className="relative -mx-8 mb-8 hidden overflow-hidden sm:mx-0 sm:flex sm:w-full sm:rounded-xl">
                <div className="flex transition-transform duration-1000" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    <Item src={BigImage1.src} />
                    <Item src={BigImage2.src} />
                    <Item src={BigImage3.src} />
                    <Item src={BigImage4.src} />
                </div>
                <div className="absolute bottom-4 right-6 rounded-full bg-black/50 px-4 py-1 text-sm text-white">
                    {currentIndex + 1}/{imageCnt}
                </div>
            </ul>
            <ul className="relative -mx-8 mb-8 flex overflow-hidden sm:mx-0 sm:hidden sm:w-full sm:rounded-xl">
                <div className="flex transition-transform duration-1000" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    <Item src={SmallImage1.src} />
                    <Item src={SmallImage2.src} />
                    <Item src={SmallImage3.src} />
                    <Item src={SmallImage4.src} />
                </div>
                <div className="absolute bottom-4 right-6 rounded-full bg-black/50 px-4 py-1 text-sm text-white">
                    {currentIndex + 1}/{imageCnt}
                </div>
            </ul>
        </>
    )
}
function Item({ src }: { src: string }) {
    return (
        <li className="w-full flex-shrink-0">
            <Image src={src} alt="frame" width={1500} height={600} quality={100} />
        </li>
    )
}
