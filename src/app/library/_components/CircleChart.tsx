import { ResponsiveCirclePacking } from "@nivo/circle-packing"

import TitleText from "@/components/Text/TitleText"

import { CombinedBookType } from "@/types/BookType"

export default function CircleChart({ bookList }: { bookList: CombinedBookType[] }) {
    const categoryCount: Record<string, number> = {}

    bookList.forEach(book => {
        book.categoryName.split(">").forEach(category => {
            categoryCount[category] = (categoryCount[category] || 0) + 1
        })
    })

    const topCategories = Object.entries(categoryCount)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([name, loc]) => ({ name, loc }))

    const data = {
        name: "genre",
        color: "#d9d9d9",
        children: topCategories
    }
    return (
        <div className="flex h-72 flex-1 flex-col">
            <TitleText className="mb-4">{"선호하는 장르🔍"}</TitleText>
            <ResponsiveCirclePacking
                data={data}
                id="name"
                value="loc"
                colors={["#A57865", "#E4C7B9", "#F0F0E4", "#BAAA91", "#A28776"]}
                colorBy="id"
                padding={2}
                theme={{ text: { fontSize: 14 } }}
                leavesOnly={true}
                enableLabels={true}
                labelsSkipRadius={0}
            />
        </div>
    )
}
