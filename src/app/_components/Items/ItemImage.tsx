"use client"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

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
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={`group relative ${className} `}>
            <Image src={book.cover} alt={book.title} className="cursor-pointer border border-zinc-300" quality={100} fill={true} loading={loading} />
            <Link href={`/information?isbn13=${book.isbn13}`} scroll={false}>
                <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
            </Link>
            <StateDot state={state} className="absolute left-3 top-3" />
            <StateButton state={state} className="absolute left-2 top-2 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="xs:inline-block hidden">
                <BookReportButton isbn13={book.isbn13} className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute right-1 top-1 z-50 rounded-full" tabIndex={0} onClick={() => setIsOpen(prev => !prev)} onBlur={() => setIsOpen(false)}>
                    <HiOutlineDotsVertical className="h-10 w-10 cursor-pointer rounded-full p-2 text-white opacity-0 transition-opacity duration-300 hover:bg-[rgba(255,255,255,0.2)] group-hover:opacity-100" />
                    <DropDown isOpen={isOpen} isbn13={book.isbn13} />
                </div>
            </div>
        </div>
    )
}
