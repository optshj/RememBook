import { CombinedBookType } from "@/app/_types/BookType"

import TitleText from "@/app/_components/Text/TitleText"

export default function BookReport({ bookList }: { bookList: CombinedBookType[] }) {
    const date = new Date()
    const currentMonth = date.getMonth()
    const currentYear = date.getFullYear()

    const threeMonthsAgo = new Date()
    threeMonthsAgo.setMonth(currentMonth - 3)
    const monthCount = [0, 0, 0]
    bookList.forEach(item => {
        const date = item.date.split("~")[0]
        const bookDate = new Date(date)
        const bookYear = bookDate.getFullYear()
        const bookMonth = bookDate.getMonth()

        const monthDiff = (currentYear - bookYear) * 12 + (currentMonth - bookMonth)

        if (monthDiff >= 0 && monthDiff < 3) {
            monthCount[monthDiff]++
        }
    })
    const totalBooks = monthCount.reduce((acc, count) => acc + count, 0)
    const monthPercentages = monthCount.map(count => (totalBooks === 0 ? 0 : (count / totalBooks) * 100))

    return (
        <div className="mt-10 flex w-full flex-col">
            <TitleText>{"독서 리포트📈"}</TitleText>
            <div className="mt-8 flex flex-col items-center gap-6">
                {monthPercentages.map((percentage, index) => (
                    <Item
                        key={index}
                        month={currentMonth - index < 0 ? 12 + (currentMonth - index + 1) : currentMonth - index + 1} // calculate month
                        percentage={percentage}
                        count={monthCount[index]}
                    />
                ))}
            </div>
        </div>
    )
}

function Item({ month, percentage, count }: { month: number; percentage: number; count: number }) {
    return (
        <div className="flex w-full gap-2">
            <div className="min-w-12 text-right text-lg font-bold">{`${month}월`}</div>
            <div className="h-6 w-full rounded-lg bg-gray-300">
                <div
                    className="h-full rounded-lg"
                    style={{
                        width: `${percentage}%`,
                        backgroundColor: "#8B5E3C"
                    }}
                />
            </div>
            <div className="min-w-8 text-right text-lg font-bold text-main-gray">{`${count}권`}</div>
        </div>
    )
}
