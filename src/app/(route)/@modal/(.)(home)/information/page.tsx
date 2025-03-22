import { Suspense } from "react"
import Image from "next/image"

import Loading from "./loading"
import Modal from "@/app/_components/Modal/Modal"
import TextArea from "./_components/TextArea"
import BookDetails from "./_components/BookDetails"
import { BookType } from "@/app/_types/AladinAPIType"

export default async function Home({ searchParams }: { searchParams: { [key: string]: string } }) {
    const isbn13 = searchParams.isbn13
    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/aladin/searchbookItem`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isbn13 }),
        cache: "no-store"
    })
    const book: BookType = await response.json()
    return (
        <Suspense fallback={<Loading />}>
            <Modal>
                <div className="h-[100vh] w-[100vw] flex-col gap-6 rounded-lg bg-white p-8 shadow-lg sm:h-auto sm:w-[calc(100vw-64px)] md:w-[750px]">
                    <div className="sm:hidden"></div>
                    <div className="mb-6 flex gap-6 border-b-2 pb-6">
                        <div className="relative h-48 w-32 flex-shrink-0 sm:h-72 sm:w-48">
                            <Image className="rounded-lg" src={book.cover} alt="책이미지" priority fill sizes="20vw" />
                        </div>
                        <div className="flex flex-col justify-center gap-2 text-main-gray">
                            <div className="line-clamp-1 whitespace-normal text-xl font-bold text-black">{book.title.split("-")[0]}</div>
                            <div className="line-clamp-1 whitespace-normal text-sm font-semibold">{book.author || "저자 미상"}</div>
                            <div className="whitespace-normal break-words text-sm font-semibold">{book.categoryName || "카테고리 미정"}</div>
                            <BookDetails isbn13={isbn13} />
                        </div>
                    </div>
                    <TextArea isbn13={isbn13} />
                </div>
            </Modal>
        </Suspense>
    )
}
