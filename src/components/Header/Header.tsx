import Link from "next/link"

import Logo from "@/../public/svg/logo.svg"
import Searchbar from "./Serachbar"

export default async function Header() {
    return (
        <div className="fixed z-50 w-full bg-white shadow-sm">
            <div className="m-auto flex max-w-5xl items-center justify-between">
                <div className="flex items-center">
                    <Link href={"/"}>
                        <Logo className="h-16 cursor-pointer" width={"160px"} />
                    </Link>
                    <Link href={"/"}>
                        <button className="my-2 w-28 p-2 text-center text-lg font-bold text-black">{"홈"}</button>
                    </Link>
                    <Link href={"/library"}>
                        <button className="my-2 w-28 p-2 text-center text-lg font-bold text-black">{"내서재"}</button>
                    </Link>
                    <Searchbar />
                </div>
                {/* <Login /> */}
            </div>
        </div>
    )
}
