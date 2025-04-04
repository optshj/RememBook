import { useRef } from "react"
import Link from "next/link"
import { addItem, deleteItem } from "@/app/_hooks/useLocalStorageBook"
import { useShowMessage } from "@/app/_hooks/useShowMessage"

import { HiPencil, HiTrash } from "react-icons/hi2"
import { BiSolidBookAlt, BiSolidAddToQueue } from "react-icons/bi"
import { MdCancel } from "react-icons/md"

import { BookType } from "@/app/_types/AladinAPIType"

interface DropDownProps {
    isOpen: boolean
    book: BookType
}
export default function DropDown({ isOpen, book }: DropDownProps) {
    const addRef = useRef<HTMLLIElement>(null)
    const deleteRef = useRef<HTMLLIElement>(null)
    const addMessageElement = useShowMessage(addRef, "서재에 추가했어요")
    const deleteMessageElement = useShowMessage(deleteRef, "서재에서 삭제했어요")

    return (
        <>
            {addMessageElement}
            {deleteMessageElement}
            <ul
                className={`fixed bottom-0 left-0 z-50 mx-4 mt-2 w-[calc(100vw-32px)] rounded-t-lg border border-zinc-300 bg-white font-semibold shadow-xl transition-all duration-500 sm:absolute sm:bottom-auto sm:left-auto sm:right-0 sm:top-full sm:w-40 sm:rounded-lg ${isOpen ? "visible translate-y-0 opacity-100" : "invisible translate-y-10 opacity-0"}`}>
                <li>
                    <Link
                        href={`/information?isbn13=${book.isbn13}`}
                        className="flex cursor-pointer items-center gap-2 rounded-t-lg px-4 py-2 hover:bg-gray-100">
                        <HiPencil />
                        {"기록하기"}
                    </Link>
                </li>
                <li className="flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-100" onClick={() => addItem(book)} ref={addRef}>
                    <BiSolidAddToQueue />
                    {"서재에 담기"}
                </li>
                <li>
                    <Link href={`/book?isbn13=${book.isbn13}`} className="flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-100">
                        <BiSolidBookAlt />
                        {"책 정보"}
                    </Link>
                </li>
                <li
                    className="flex cursor-pointer items-center gap-2 rounded-b-lg px-4 py-2 hover:bg-gray-100"
                    onClick={() => deleteItem(book.isbn13)}
                    ref={deleteRef}>
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
