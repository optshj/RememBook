"use client"
import { useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRipple } from "@/app/_hooks/useRipple"

import { BiSolidHome, BiSolidBook, BiSolidStar } from "react-icons/bi"

export default function TabBar() {
    return (
        <div className="fixed bottom-0 left-0 z-50 flex w-full cursor-pointer items-center border-t border-zinc-200 bg-white text-2xl font-semibold text-zinc-400 sm:hidden">
            <Item href={"/"}>
                <BiSolidHome />
                <span className="mt-1 text-xs">{"홈"}</span>
            </Item>
            <Item href={"/library"}>
                <BiSolidBook />
                <span className="mt-1 text-xs">{"내서재"}</span>
            </Item>
            <Item href={"/recommend"}>
                <BiSolidStar />
                <span className="mt-1 text-xs">{"책추천"}</span>
            </Item>
        </div>
    )
}

function Item({ children, href }: { children: React.ReactNode; href: string }) {
    const pathName = usePathname()
    const itemRef = useRef(null)
    const isActive = pathName === href
    const ripple = useRipple(itemRef, "#3f3f46")

    return (
        <Link href={href} className={`relative flex flex-col items-center overflow-hidden py-3 ${isActive ? "text-mocha" : ""} flex-grow`} ref={itemRef}>
            {children}
            {ripple}
        </Link>
    )
}
