"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { IoIosSearch } from "react-icons/io"

export default function Searchbar() {
    const router = useRouter()
    const [search, setSearch] = useState<string>("")

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (search.trim() !== "") router.push(`/result?query=${search}`)
        setSearch("")
        ;(e.target as HTMLFormElement).querySelector("input")?.blur()
    }
    return (
        <form className="flex items-center justify-between mx-4 border-2 border-solid w-96 rounded-3xl border-mocha" onSubmit={onSubmit}>
            <input className="px-3 m-1 placeholder:text-sm " placeholder={"책 제목을 입력해주세요"} onChange={e => setSearch(e.target.value)} value={search} />
            <IoIosSearch className="w-6 h-6 mx-4 cursor-pointer text-mocha" />
        </form>
    )
}
