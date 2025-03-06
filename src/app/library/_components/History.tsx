import { CombinedBookType } from "@/types/BookType"

import TitleText from "@/components/Text/TitleText"

export default function History({ bookList }: { bookList: CombinedBookType[] }) {
    return (
        <div className="flex w-60 flex-col gap-6">
            <TitleText>{"최근 독서기록🧾"}</TitleText>
            <ul className="flex flex-col gap-3">
                {bookList.map(item => (
                    <Item key={item.isbn13} book={item} />
                ))}
            </ul>
        </div>
    )
}
function Item({ book }: { book: CombinedBookType }) {
    return (
        <li className="flex flex-col">
            <div className="text-xl font-bold">{book.title}</div>
            <div className="font-semibold text-main-gray">{book.date}</div>
        </li>
    )
}
