import { Suspense } from "react"
import Image from "next/image"

import { BookType } from "@/app/_types/AladinAPIType"

import Loading from "./loading"
import Modal from "@/app/_components/Modal/Modal"

import BackArrow from "@/app/_components/Button/BackArrow"
import CloseButton from "./_components/CloseButton"

export default async function Home({ searchParams }: { searchParams: { [key: string]: string } }) {
    const isbn13 = searchParams.isbn13
    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/aladin/searchbookItem?isbn13=${isbn13}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store"
    })
    const book: BookType = await response.json()
    const shortCategory = book.categoryName.split(">").slice(-1)[0]

    return (
        <Suspense fallback={<Loading />}>
            <Modal>
                <div className="h-[100vh] w-[100vw] flex-col gap-6 overflow-y-auto bg-white p-4 shadow-lg sm:h-auto sm:w-[calc(100vw-64px)] sm:rounded-lg sm:p-8 md:w-[800px]">
                    <BackArrow className="absolute left-2 top-2 z-20 h-6 w-6 sm:hidden" />

                    <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="flex justify-center bg-cover py-10 sm:p-0" style={{ backgroundImage: `url(${book.cover})` }}>
                            <div className="absolute inset-0 z-0 backdrop-blur-3xl sm:backdrop-blur-none" />
                            <div className="relative h-72 w-48 flex-shrink-0 border border-zinc-300 sm:mt-0">
                                <Image src={book.cover} alt={book.title} priority fill sizes="20vw" quality={100} />
                            </div>
                        </div>

                        <div className="z-10 flex w-full flex-col gap-1 p-4 text-lg font-semibold text-black">
                            <div className="line-clamp-2 text-2xl">{book.title.split("-")[0]}</div>
                            <div className="line-clamp-1 text-main-gray">{book.author || "저자 미상"}</div>
                            <div className="line-clamp-2 hidden text-main-gray sm:inline-block">{book.categoryName || "카테고리 미정"}</div>
                            <div className="text-main-gray sm:hidden">장르 : {shortCategory || "카테고리 미정"}</div>
                            <div className="line-clamp-1 text-main-gray">
                                {book.publisher || "출판사 미상"} · {book.pubDate || "출판일 미상"}
                            </div>
                            <div className="mt-4">{book.description || "책 소개가 비어있어요"}</div>
                        </div>
                    </div>
                    <CloseButton />
                </div>
            </Modal>
        </Suspense>
    )
}
