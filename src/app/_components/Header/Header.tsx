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
        <div className="fixed left-0 top-0 z-50 w-full bg-white py-3 shadow-sm sm:p-0">
            <div className="mx-4 flex max-w-5xl items-center justify-between lg:m-auto">
                <div className="flex items-center text-center text-xl font-bold text-black">
                    <Link href={"/"} aria-label="home">
                        <LogoWord className="mr-2 h-10 w-10 cursor-pointer sm:hidden" />
                        <Logo className="hidden h-16 w-48 cursor-pointer sm:inline" />
                    </Link>
                    <Link className="hidden sm:inline" href={"/"} aria-label="home">
                        <button className="my-2 w-28 p-2">{"홈"}</button>
                    </Link>
                    <Link className="hidden sm:inline" href={"/library"} aria-label="library">
                        <button className="my-2 w-28 p-2">{"내서재"}</button>
                    </Link>
                    <Link className="hidden sm:inline" href={"/recommend"} aria-label="recommend">
                        <button className="my-2 w-28 p-2">{"책추천"}</button>
                    </Link>
                </div>
                <form
                    className="mx-2 flex w-full min-w-56 max-w-72 items-center justify-between rounded-full border border-solid border-mocha"
                    onSubmit={onSubmit}>
                    <input
                        className="my-1 ml-4 w-full placeholder:text-sm"
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
