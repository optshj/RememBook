import Link from "next/link"

import { HiPencil, HiTrash } from "react-icons/hi2"
import { BiSolidBookAlt, BiSolidAddToQueue } from "react-icons/bi"
import { MdCancel } from "react-icons/md"

import { addItem, deleteItem } from "@/app/_hooks/useLocalStorageBook"
import { useState } from "react"
import ShowMessage from "../Text/ShowMessage"

interface DropDownProps {
    isOpen: boolean
    isbn13: string
}
export default function DropDown({ isOpen, isbn13 }: DropDownProps) {
    const [isActive, setIsActive] = useState(false)
    const handleAdd = () => {
        addItem(isbn13)
        setIsActive(true)
    }
    return (
        <>
            <ShowMessage message={"서재에 담겼습니다"} isActive={isActive} setIsActive={setIsActive} />
            <ul
                className={`transition-allduration-300 fixed bottom-0 left-0 z-50 mx-4 mt-2 w-[calc(100vw-32px)] rounded-lg bg-white font-semibold shadow-xl transition-all sm:absolute sm:bottom-auto sm:left-auto sm:right-0 sm:top-full sm:w-40 ${isOpen ? "visible translate-y-0 opacity-100" : "invisible translate-y-10 opacity-0"}`}>
                <li>
                    <Link href={`/information?isbn13=${isbn13}`} className="flex cursor-pointer items-center gap-2 rounded-t-lg px-4 py-2 hover:bg-gray-100">
                        <HiPencil />
                        {"기록하기"}
                    </Link>
                </li>
                <li className="flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-100" onClick={handleAdd}>
                    <BiSolidAddToQueue />
                    {"서재에 담기"}
                </li>
                <li className="flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-100">
                    <BiSolidBookAlt />
                    {"책 정보"}
                </li>
                <li className="flex cursor-pointer items-center gap-2 rounded-b-lg px-4 py-2 hover:bg-gray-100" onClick={() => deleteItem(isbn13)}>
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
