import { Suspense } from "react"
import Image from "next/image"

import { BookType } from "@/app/_types/AladinAPIType"

import Loading from "./loading"
import Modal from "@/app/_components/Modal/Modal"
import TextArea from "./_components/TextArea"
import BookDetails from "./_components/BookDetails"
import BackArrow from "@/app/_components/Button/BackArrow"

export default async function Home({ searchParams }: { searchParams: { [key: string]: string } }) {
    const isbn13 = searchParams.isbn13
    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/aladin/searchbookItem`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isbn13 }),
        cache: "no-store"
    })
    const book: BookType = await response.json()
    const shortCategory = book.categoryName.split(">").slice(-1)[0]

    return (
        <Suspense fallback={<Loading />}>
            <Modal>
                <div className="h-[100vh] w-[100vw] flex-col gap-6 overflow-y-auto bg-white p-4 shadow-lg sm:h-auto sm:w-[calc(100vw-64px)] sm:rounded-lg sm:p-8 md:w-[750px]">
                    <BackArrow className="absolute left-2 top-2 z-20 h-6 w-6 sm:hidden" />

                    <div className="flex flex-col sm:flex-row">
                        <div className="flex justify-center bg-cover" style={{ backgroundImage: `url(${book.cover})` }}>
                            <div className="absolute inset-0 z-0 backdrop-blur-3xl sm:backdrop-blur-none" />
                            <div className="relative mt-10 h-72 w-48 flex-shrink-0 border border-zinc-300 sm:mt-0">
                                <Image src={book.cover} alt="책이미지" priority fill sizes="20vw" quality={100} />
                            </div>
                        </div>

                        <div className="z-10 mt-10 flex w-full flex-col justify-center gap-2 text-main-gray sm:pl-4">
                            <div className="line-clamp-2 whitespace-normal text-xl font-bold text-black">{book.title.split("-")[0]}</div>
                            <div className="line-clamp-1 whitespace-normal text-sm font-semibold">{book.author || "저자 미상"}</div>
                            <div className="hidden whitespace-normal break-words text-sm font-semibold sm:inline">{book.categoryName || "카테고리 미정"}</div>
                            <div className="whitespace-normal break-words text-sm font-semibold sm:hidden">{shortCategory || "카테고리 미정"}</div>
                            <BookDetails isbn13={isbn13} />
                        </div>
                    </div>
                    <TextArea isbn13={isbn13} className="mt-6 border-t pt-6" />
                </div>
            </Modal>
        </Suspense>
    )
}
