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
    }
    return (
        <form className="mx-4 flex w-96 items-center justify-between rounded-3xl border-2 border-solid border-mocha" onSubmit={onSubmit}>
            <input className="m-1 mx-4 placeholder:text-sm" placeholder={"책 제목을 입력해주세요"} onChange={e => setSearch(e.target.value)} value={search} />
            <IoIosSearch className="mx-4 h-6 w-6 cursor-pointer text-mocha" />
        </form>
    )
}
