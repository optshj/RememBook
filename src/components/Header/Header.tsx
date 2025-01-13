import Logo from "@/../public/svg/logo.svg"
import { IoIosSearch } from "react-icons/io"

export default function Header() {
    return (
        <div className="bg-white shadow-sm fixed z-50 w-full">
            <div className="flex items-center justify-between max-w-5xl m-auto">
                <div className="flex items-center">
                    <Logo className="h-16" width={"160px"} />
                    <button className="p-2 my-2 text-lg font-bold text-center text-black w-28">{"홈"}</button>
                    <button className="p-2 my-2 text-lg font-bold text-center text-black w-28">{"내 서재"}</button>
                    <div className="flex items-center justify-between mx-4 border-2 border-solid w-96 rounded-3xl border-main-blue">
                        <input className="px-3 m-1 placeholder:text-sm" placeholder={"책 제목을 입력해주세요"} />
                        <IoIosSearch className="w-6 h-6 mx-4 cursor-pointer text-main-blue" />
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-main-blue"></div>
                    <div className="mx-2 p-0.5 text-sm text-main-gray rounded-lg border-2 border-solid cursor-pointer flex items-center">{"로그아웃"}</div>
                </div>
            </div>
        </div>
    )
}
