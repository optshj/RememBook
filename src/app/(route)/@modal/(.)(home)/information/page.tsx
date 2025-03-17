import { Suspense } from "react"
import Image from "next/image"

import Loading from "./loading"
import Modal from "@/app/_components/Modal/Modal"
import TextArea from "./_components/TextArea"
import BookDetails from "./_components/BookDetails"

export default async function Home({ searchParams }: { searchParams: { [key: string]: string } }) {
    const isbn13 = searchParams.isbn13
    let data
    let book

    try {
        const response = await fetch(
            `http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${process.env.NEXT_PUBLIC_ALADIN_TTB_KEY}&ItemId=${isbn13}&ItemIdType=ISBN13&cover=big&output=js`
        )
        data = await response.text()
        data = data.replace(/\\[abfnrtv0'"\\]/g, "")
        if (data.endsWith(";")) {
            data = data.slice(0, -1)
        }
        const parsedData = await JSON.parse(data)
        book = parsedData.item[0]
    } catch (error) {
        return (
            <Modal>
                <div className="rounded-lg bg-white p-8 shadow-lg">
                    <div className="font-semibold">{"데이터를 불러오는 중 문제가 발생했습니다."}</div>
                </div>
            </Modal>
        )
    }
    const category = book.categoryName.split(">")
    return (
        <Suspense fallback={<Loading />}>
            <Modal className="w-full sm:w-auto">
                <div className="mx-4 flex flex-col gap-6 rounded-lg bg-white p-8 shadow-lg sm:mx-2 sm:w-[700px]">
                    <div className="flex gap-6 border-b-2 pb-6">
                        <div className="relative h-72 w-48 flex-shrink-0">
                            <Image className="rounded-lg" src={book.cover} alt="책이미지" priority fill sizes="20vw" />
                        </div>
                        <div className="flex flex-col justify-center gap-2">
                            <div className="line-clamp-1 whitespace-normal text-xl font-bold text-black">{book.title.split("-")[0]}</div>
                            <div className="line-clamp-1 text-sm font-semibold text-main-gray">{book.author || "저자 미상"}</div>
                            <div className="text-sm font-semibold text-main-gray">
                                {category.map((item: string, index: number) => (
                                    <span key={index}>
                                        {item}
                                        {index < category.length - 1 && ">"}
                                    </span>
                                ))}
                            </div>
                            <BookDetails isbn13={isbn13} />
                        </div>
                    </div>
                    <TextArea isbn13={isbn13} />
                </div>
            </Modal>
        </Suspense>
    )
}
