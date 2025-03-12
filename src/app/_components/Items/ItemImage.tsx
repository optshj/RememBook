"use client"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"

import { BookType } from "@/types/AladinAPIType"

import { HiOutlineDotsVertical } from "react-icons/hi"
import { HiPencil, HiTrash } from "react-icons/hi2"
import { BiSolidBookAlt } from "react-icons/bi"

import StateButton from "@/app/_components/Button/StateButton"
import BookReportButton from "@/app/_components/Button/BookReportButton"
import Link from "next/link"

interface ItemImageProps {
    book: BookType
    state: number
    className?: string
}
export default function ItemImage({ book, state, className }: ItemImageProps) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false)
        }
    }
    const deleteItem = () => {
        const item = localStorage.getItem(book.isbn13)
        if (item) localStorage.removeItem(book.isbn13)
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className={`group relative ${className}`}>
            <Link href={`/information?isbn13=${book.isbn13}`}>
                <Image src={book.cover} alt={book.title} className="cursor-pointer rounded-lg" quality={100} sizes="20vw" fill={true} />
            </Link>
            <div className="absolute inset-0 rounded-lg bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
            <StateButton state={state} className="absolute left-2 top-2 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <BookReportButton isbn13={book.isbn13} className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div ref={dropdownRef} className="absolute right-1 top-1" onClick={() => setIsOpen(!isOpen)}>
                <HiOutlineDotsVertical className="h-10 w-10 cursor-pointer rounded-full p-2 text-white opacity-0 transition-opacity duration-300 hover:bg-[rgba(255,255,255,0.2)] group-hover:opacity-100" />
                {isOpen && (
                    <div className="absolute right-0 top-full z-50 mt-2 w-52 rounded-lg bg-white font-semibold shadow-lg">
                        <Link href={`/information?isbn13=${book.isbn13}`}>
                            <div className="flex cursor-pointer items-center gap-2 rounded-t-lg px-4 py-2 hover:bg-gray-100">
                                <HiPencil />
                                {"기록하기"}
                            </div>
                        </Link>
                        <div className="flex cursor-pointer items-center gap-2 rounded-t-lg px-4 py-2 hover:bg-gray-100">
                            <BiSolidBookAlt />
                            {"책 정보"}
                        </div>
                        <div className="flex cursor-pointer items-center gap-2 rounded-b-lg px-4 py-2 hover:bg-gray-100" onClick={deleteItem}>
                            <HiTrash />
                            {"서재에서 삭제하기"}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
