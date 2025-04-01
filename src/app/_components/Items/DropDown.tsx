import { useState } from "react"
import Link from "next/link"
import { addItem, deleteItem } from "@/app/_hooks/useLocalStorageBook"

import { HiPencil, HiTrash } from "react-icons/hi2"
import { BiSolidBookAlt, BiSolidAddToQueue } from "react-icons/bi"
import { MdCancel } from "react-icons/md"

import { BookType } from "@/app/_types/AladinAPIType"

import ShowMessage from "../Text/ShowMessage"

interface DropDownProps {
    isOpen: boolean
    book: BookType
}
export default function DropDown({ isOpen, book }: DropDownProps) {
    const [isAdded, setIsAdded] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)
    const handleAdd = () => {
        addItem(book)
        setIsAdded(true)
    }
    const handleDelete = () => {
        deleteItem(book.isbn13)
        setIsDeleted(true)
    }

    return (
        <>
            <ShowMessage message={"서재에 담겼습니다"} isActive={isAdded} setIsActive={setIsAdded} />
            <ShowMessage message={"서재에서 삭제되었습니다"} isActive={isDeleted} setIsActive={setIsDeleted} />
            <ul
                className={`transition-allduration-300 fixed bottom-0 left-0 z-50 mx-4 mt-2 w-[calc(100vw-32px)] rounded-t-lg border border-zinc-300 bg-white font-semibold shadow-xl transition-all sm:absolute sm:bottom-auto sm:left-auto sm:right-0 sm:top-full sm:w-40 sm:rounded-lg ${isOpen ? "visible translate-y-0 opacity-100" : "invisible translate-y-10 opacity-0"}`}>
                <li>
                    <Link
                        href={`/information?isbn13=${book.isbn13}`}
                        className="flex cursor-pointer items-center gap-2 rounded-t-lg px-4 py-2 hover:bg-gray-100">
                        <HiPencil />
                        {"기록하기"}
                    </Link>
                </li>
                <li className="flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-100" onClick={handleAdd}>
                    <BiSolidAddToQueue />
                    {"서재에 담기"}
                </li>
                <li>
                    <Link href={`/book?isbn13=${book.isbn13}`} className="flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-100">
                        <BiSolidBookAlt />
                        {"책 정보"}
                    </Link>
                </li>
                <li className="flex cursor-pointer items-center gap-2 rounded-b-lg px-4 py-2 hover:bg-gray-100" onClick={handleDelete}>
                    <HiTrash />
                    {"서재에서 삭제"}
                </li>
                <li className="flex cursor-pointer items-center gap-2 rounded-b-lg px-4 py-2 hover:bg-gray-100">
                    <MdCancel />
                    {"닫기"}
                </li>
            </ul>
        </>
    )
}
