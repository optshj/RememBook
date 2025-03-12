"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { IoIosSearch } from "react-icons/io"

import Logo from "@/../public/svg/logo.svg"

export default function Header() {
    const router = useRouter()
    const [search, setSearch] = useState<string>("")

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (search.trim() !== "") router.push(`/result?query=${search}`)
    }
    return (
        <div className="fixed left-0 top-0 z-50 w-full bg-white shadow-sm">
            <div className="m-auto flex max-w-5xl items-center">
                <Link href={"/"}>
                    <Logo className="h-16 cursor-pointer" width={"160px"} />
                </Link>
                <Link href={"/"}>
                    <button className="my-2 w-28 p-2 text-center text-lg font-bold text-black">{"홈"}</button>
                </Link>
                <Link href={"/library"}>
                    <button className="my-2 w-28 p-2 text-center text-lg font-bold text-black">{"내서재"}</button>
                </Link>
                <form className="mx-4 flex w-96 items-center justify-between rounded-3xl border-2 border-solid border-mocha" onSubmit={onSubmit}>
                    <input
                        className="m-1 mx-4 placeholder:text-sm"
                        placeholder={"책 제목을 입력해주세요"}
                        onChange={e => setSearch(e.target.value)}
                        value={search}
                        spellCheck={false}
                    />
                    <IoIosSearch className="mx-4 h-6 w-6 cursor-pointer text-mocha" />
                </form>
            </div>
            {/* <Login /> */}
        </div>
    )
}
