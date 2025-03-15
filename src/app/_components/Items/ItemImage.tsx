"use client"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

import { BookType } from "@/types/AladinAPIType"

import { HiOutlineDotsVertical } from "react-icons/hi"
import { HiPencil, HiTrash } from "react-icons/hi2"
import { BiSolidBookAlt, BiSolidAddToQueue } from "react-icons/bi"

import StateButton from "@/app/_components/Button/StateButton"
import BookReportButton from "@/app/_components/Button/BookReportButton"

interface ItemImageProps {
    book: BookType
    state: number
    className?: string
}
export default function ItemImage({ book, state, className }: ItemImageProps) {
    const [isOpen, setIsOpen] = useState(false)

    const addItem = () => {
        const item = localStorage.getItem(book.isbn13)
        if (!item) localStorage.setItem(book.isbn13, JSON.stringify({ rating: 0, date: "", state: 0, text: "" }))
    }
    const deleteItem = () => {
        const item = localStorage.getItem(book.isbn13)
        if (item) localStorage.removeItem(book.isbn13)
    }

    return (
        <div className={`group relative ${className} `}>
            <Link href={`/information?isbn13=${book.isbn13}`}>
                <Image src={book.cover} alt={book.title} className="cursor-pointer rounded-lg" quality={100} sizes="20vw" fill={true} loading="eager" />
            </Link>
            <div className="absolute inset-0 rounded-lg bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
            <StateButton state={state} className="absolute left-2 top-2 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <BookReportButton isbn13={book.isbn13} className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="absolute right-1 top-1 z-50 rounded-full" tabIndex={0} onClick={() => setIsOpen(prev => !prev)} onBlur={() => setIsOpen(false)}>
                <HiOutlineDotsVertical className="h-10 w-10 cursor-pointer rounded-full p-2 text-white opacity-0 transition-opacity duration-300 hover:bg-[rgba(255,255,255,0.2)] group-hover:opacity-100" />
                <ul
                    className={`absolute right-0 top-full z-50 mt-2 w-40 rounded-lg bg-white font-semibold shadow-lg transition-all duration-300 ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
                    <li>
                        <Link
                            href={`/information?isbn13=${book.isbn13}`}
                            className="flex cursor-pointer items-center gap-2 rounded-t-lg px-4 py-2 hover:bg-gray-100">
                            <HiPencil />
                            {"기록하기"}
                        </Link>
                    </li>
                    <li className="flex cursor-pointer items-center gap-2 rounded-t-lg px-4 py-2 hover:bg-gray-100" onClick={addItem}>
                        <BiSolidAddToQueue />
                        {"서재에 담기"}
                    </li>
                    <li className="flex cursor-pointer items-center gap-2 rounded-t-lg px-4 py-2 hover:bg-gray-100">
                        <BiSolidBookAlt />
                        {"책 정보"}
                    </li>
                    <li className="flex cursor-pointer items-center gap-2 rounded-b-lg px-4 py-2 hover:bg-gray-100" onClick={deleteItem}>
                        <HiTrash />
                        {"서재에서 삭제"}
                    </li>
                </ul>
            </div>
        </div>
    )
}
