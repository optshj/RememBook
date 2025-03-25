"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { IoIosSearch } from "react-icons/io"

import Logo from "@/../public/svg/logo.svg"
import LogoWord from "@/../public/svg/logoWord.svg"

export default function Header() {
    const router = useRouter()
    const [search, setSearch] = useState<string>("")

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (search.trim() !== "") router.push(`/result?query=${search}`)
    }
    return (
        <div className="fixed left-0 top-0 z-50 w-full bg-white shadow-sm">
            <div className="mx-4 hidden max-w-5xl items-center justify-between sm:flex lg:m-auto">
                <div className="flex items-center text-center text-xl font-bold text-black">
                    <Link href={"/"} aria-label="home">
                        <Logo className="h-16 w-48 cursor-pointer" />
                    </Link>
                    <Link href={"/"} aria-label="home">
                        <button className="my-2 w-28 p-2">{"홈"}</button>
                    </Link>
                    <Link href={"/library"} aria-label="library">
                        <button className="my-2 w-28 p-2">{"내서재"}</button>
                    </Link>
                </div>
                <form className="mx-2 flex max-w-96 items-center justify-between rounded-full border border-solid border-mocha" onSubmit={onSubmit}>
                    <input
                        className="mx-4 my-1 placeholder:text-sm"
                        placeholder={"책 제목을 입력해주세요"}
                        onChange={e => setSearch(e.target.value)}
                        value={search}
                        spellCheck={false}
                    />
                    <IoIosSearch className="mx-4 h-6 w-6 cursor-pointer text-mocha" />
                </form>
            </div>
            {/* small screen */}
            <div className="m-4 flex max-w-5xl items-center justify-between sm:hidden">
                <Link href={"/"} aria-label="home">
                    <LogoWord className="h-10 w-10 cursor-pointer" />
                </Link>
                <form className="mx-2 flex items-center justify-between rounded-full border border-solid border-mocha" onSubmit={onSubmit}>
                    <input
                        className="mx-4 my-1 placeholder:text-sm"
                        placeholder={"책 제목을 입력해주세요"}
                        onChange={e => setSearch(e.target.value)}
                        value={search}
                    />
                    <IoIosSearch className="mx-4 h-6 w-6 cursor-pointer text-mocha" />
                </form>
            </div>
            {/* <Login /> */}
        </div>
    )
}
