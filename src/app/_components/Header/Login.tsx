"use client"
import Link from "next/link"

import { useAppSelector } from "@/app/_store/Provider"

export default function Login() {
    const userData = useAppSelector(state => state.userData.userData)
    const handleLogout = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/kakao/logout`, {
            method: "GET",
            credentials: "include"
        })
        window.location.href = "/"
    }

    return (
        <>
            {userData ? (
                <div className="flex items-center">
                    <div className="mx-2 p-0.5 text-sm">{userData.properties.nickname}님</div>
                    <Link href={"/"} onClick={handleLogout} replace prefetch={false}>
                        <div className="mx-2 flex cursor-pointer items-center rounded-lg border-2 border-solid px-1 py-0.5 text-sm">{"로그아웃"}</div>
                    </Link>
                </div>
            ) : (
                <Link href={"/login"}>
                    <div className="mx-2 flex cursor-pointer items-center rounded-lg border-2 border-solid px-1 py-0.5 text-sm">{"로그인"}</div>
                </Link>
            )}
        </>
    )
}
