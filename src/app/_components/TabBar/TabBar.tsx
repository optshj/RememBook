"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { BiSolidHome, BiSolidBook } from "react-icons/bi"
import { HiPencil } from "react-icons/hi2"

export default function TabBar() {
    return (
        <div className="fixed bottom-0 left-0 z-50 h-16 w-full border-t border-zinc-200 bg-white sm:hidden">
            <div className="flex h-full items-center justify-around font-semibold text-zinc-400">
                <Item href={"/"}>
                    <BiSolidHome className="text-2xl" />
                    <span className="text-xs">{"홈"}</span>
                </Item>
                <Item href={"/library"}>
                    <BiSolidBook className="text-2xl" />
                    <span className="text-xs">{"내 서재"}</span>
                </Item>
                <Item href={"/record"}>
                    <HiPencil className="text-2xl" />
                    <span className="text-xs">{"기록하기"}</span>
                </Item>
            </div>
        </div>
    )
}

function Item({ children, href }: { children: React.ReactNode; href: string }) {
    const pathName = usePathname()
    const isActive = pathName === href
    return (
        <Link href={href}>
            <div className={`flex w-16 cursor-pointer flex-col items-center ${isActive && "text-mocha"}`}>{children}</div>
        </Link>
    )
}
