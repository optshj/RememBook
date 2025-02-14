import Link from "next/link"

import Logo from "@/../public/svg/logo.svg"
import Searchbar from "./Serachbar"
import Login from "./Login"

export default async function Header() {
    return (
        <div className="bg-white shadow-sm fixed z-50 w-full">
            <div className="flex items-center justify-between max-w-5xl m-auto">
                <div className="flex items-center">
                    <Link href={"/"}>
                        <Logo className="h-16 cursor-pointer" width={"160px"} />
                    </Link>
                    <Link href={"/"}>
                        <button className="p-2 my-2 text-lg font-bold text-center text-black w-28">{"홈"}</button>
                    </Link>
                    <Link href={"/library"}>
                        <button className="p-2 my-2 text-lg font-bold text-center text-black w-28">{"내서재"}</button>
                    </Link>
                    <Searchbar />
                </div>
                <div className="flex gap-2">
                    <Login />
                </div>
            </div>
        </div>
    )
}
