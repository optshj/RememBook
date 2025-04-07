"use client"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

import { useLongPress } from "use-long-press"

import { BookType } from "@/app/_types/AladinAPIType"

import { HiOutlineDotsVertical } from "react-icons/hi"

import StateButton, { StateDot } from "@/app/_components/Button/StateButton"
import BookReportButton from "@/app/_components/Button/BookReportButton"
import DropDown from "./DropDown"

interface ItemImageProps {
    book: BookType
    state: number
    loading?: "eager" | "lazy"
    className?: string
}
export default function ItemImage({ book, state, className = "", loading = "lazy" }: ItemImageProps) {
    const transitionClass = "opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    const [isOpen, setIsOpen] = useState(false)

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const onLongPress = useLongPress(() => {
        setIsOpen(true)
    })

    return (
        <div className={`group relative ${className}`}>
            <Image src={book.cover} alt={book.title} className="border border-zinc-300" quality={100} fill={true} loading={loading} />

            <Link href={`/information?isbn13=${book.isbn13}`} scroll={false} {...onLongPress()} onBlur={() => setIsOpen(false)}>
                <div className={`absolute inset-0 bg-black/50 ${transitionClass}`} />
            </Link>

            <StateDot state={state} className="absolute left-3 top-3" />
            <StateButton state={state} className={`absolute left-2 top-2 ${transitionClass}`} />
            <BookReportButton isbn13={book.isbn13} className={`hidden xs:flex ${transitionClass}`} />

            <div className="absolute right-1 top-1" onClick={() => setIsOpen(prev => !prev)} ref={ref}>
                <HiOutlineDotsVertical
                    className={`hidden h-10 w-10 cursor-pointer rounded-full p-2 text-white hover:bg-[rgba(255,255,255,0.2)] xs:inline-block ${transitionClass}`}
                />
                <DropDown isOpen={isOpen} book={book} />
            </div>
        </div>
    )
}
