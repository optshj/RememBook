import { Suspense } from "react"

import Loading from "./loading"
import ItemList from "./components/ItemList"

export default async function Result({ searchParams }: { searchParams: { [key: string]: string } }) {
    const query = searchParams.query
    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/aladin/searchbook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
        cache: "no-store"
    })
    const data = await response.json()
    const books = data.item

    return (
        <Suspense fallback={<Loading />}>
            {books.length === 0 ? (
                <div className="mt-10 flex w-full flex-col items-center justify-center gap-1 text-xl font-semibold">
                    <div>
                        <span className="text-red-500">{`\`${query}\``}</span>
                        {`에 대한 검색 결과가 없습니다.`}
                    </div>
                    <div>{"다른 검색어를 입력하시거나"}</div>
                    <div>{"철자와 띄어쓰기를 확인해보세요."}</div>
                </div>
            ) : (
                <ItemList books={books} />
            )}
        </Suspense>
    )
}
