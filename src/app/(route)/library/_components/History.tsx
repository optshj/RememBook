import { CombinedBookType } from "@/app/_types/BookType"

import TitleText from "@/app/_components/Text/TitleText"

export default function History({ bookList }: { bookList: CombinedBookType[] }) {
    const sortedBookList = [...bookList].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6)
    return (
        <div className="flex flex-grow flex-col gap-6">
            <TitleText>{"최근 독서기록🧾"}</TitleText>
            <ul className="flex flex-col gap-3">
                {sortedBookList.length === 0 ? (
                    <div className="m-auto text-center text-xl font-semibold text-main-gray">
                        {"아직 기록이 없네요!"}
                        <br />
                        {"지금부터 시작해보세요!"}
                    </div>
                ) : (
                    sortedBookList.map(item => <Item key={item.isbn13} book={item} />)
                )}
            </ul>
        </div>
    )
}
function Item({ book }: { book: CombinedBookType }) {
    return (
        <li className="flex max-w-96 flex-col">
            <div className="line-clamp-1 whitespace-normal text-lg font-bold">{book.title.split("-")[0]}</div>
            <div className="line-clamp-1 whitespace-normal font-semibold text-main-gray">{book.date ? book.date : "비어있음"}</div>
        </li>
    )
}
