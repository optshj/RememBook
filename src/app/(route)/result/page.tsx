import { Suspense } from "react"

import Loading from "./loading"
import NoResult from "./components/NoResult"
import ItemList from "./components/ItemList"

export default async function Result({ searchParams }: { searchParams: { [key: string]: string } }) {
    const query = searchParams.query
    let books
    let data
    try {
        const response = await fetch(
            `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${process.env.NEXT_PUBLIC_ALADIN_TTB_KEY}&Query=${query}&searchTarget=Book&output=js&Cover=big&sort=SalesPoint&MaxResults=100`
        )
        data = await response.text()
        data = data.replace(/\\[abfnrtv0'"\\]/g, "")
        if (data.endsWith(";")) data = data.slice(0, -1)
        const parsedData = await JSON.parse(data)
        books = parsedData.item
    } catch (error) {
        return (
            <div className="mt-10 flex w-full flex-col items-center justify-center gap-1 text-xl font-semibold">
                {"데이터를 불러오는 중 문제가 발생했습니다."}
            </div>
        )
    }

    return <Suspense fallback={<Loading />}>{books.length === 0 ? <NoResult query={query} /> : <ItemList books={books} />}</Suspense>
}
