import Image from "next/image"

import { FaStar } from "react-icons/fa6"

import StateButton from "@/components/Button/StateButton"
import CommonButton from "@/components/Button/CommonButton"

import Modal from "@/components/Modal/Modal"

export default async function Home({ searchParams }: { searchParams: { [key: string]: string } }) {
    const isbn13 = searchParams.isbn13
    const response = await fetch(
        `http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${process.env.NEXT_PUBLIC_ALADIN_TTB_KEY}&ItemId=${isbn13}&ItemIdType=ISBN13&cover=big&output=js`
    )
    let data = await response.text()
    if (data.endsWith(";")) {
        data = data.slice(0, -1)
    }
    const book = await JSON.parse(data).item[0]
    return (
        <Modal>
            <div className="flex flex-col gap-6 p-8 bg-white border-b-2 rounded-lg shadow-lg w-[600px]">
                <div className="flex gap-6 pb-6 border-b-2">
                    <div className="relative w-48 h-72 flex-shrink-0">
                        <Image className="rounded-lg" src={book.cover} alt="책이미지" priority fill sizes="20vw" />
                    </div>
                    <div className="flex flex-col justify-center gap-3">
                        <div className="text-xl font-bold text-black whitespace-normal">{book.title}</div>
                        <div className="text-sm font-semibold text-main-gray">{book.author || "저자 미상"}</div>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1 text-sm font-semibold text-main-gray">
                                {"나의평가"}
                                <FaStar className="text-yellow" />
                                <div className="text-yellow">{"3.9"}</div>
                            </div>
                            <div className="text-sm font-semibold text-main-gray">{"읽은 기간 2024.12.27 ~ 2024.12.31"}</div>
                            <StateButton />
                        </div>
                    </div>
                </div>
                <textarea className="w-full p-4 text-left text-black align-top rounded-lg resize-none bg-bg-gray h-60" placeholder="독후감을 작성해주세요" />
                <div className="flex justify-center gap-2">
                    <CommonButton>{"저장하기"}</CommonButton>
                    <CommonButton color="main-gray">{"닫기"}</CommonButton>
                </div>
            </div>
        </Modal>
    )
}
