import { useState, useEffect } from "react"
import { ResponsiveCirclePacking } from "@nivo/circle-packing"
import TitleText from "@/app/_components/Text/TitleText"
import { CombinedBookType } from "@/types/BookType"

export default function CircleChart({ bookList }: { bookList: CombinedBookType[] }) {
    const [categoryData, setCategoryData] = useState<any>(null)

    useEffect(() => {
        const categoryCount: Record<string, number> = {}
        bookList.forEach(book => {
            categoryCount[book.categoryId] = (categoryCount[book.categoryId] || 0) + 1
        })

        const topCategoryIds = Object.entries(categoryCount)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([id]) => id)

        const fetchData = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/aladin/getCategory`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ categoryIds: topCategoryIds })
            })
            const categoryMap = await res.json()

            const topCategories = topCategoryIds.map(id => ({
                name: categoryMap[id] || id,
                loc: categoryCount[id]
            }))

            setCategoryData({
                name: "genre",
                color: "#d9d9d9",
                children: topCategories
            })
        }

        fetchData()
    }, [bookList])

    return (
        <div className="flex h-72 flex-1 flex-col">
            <TitleText className="mb-4">{"선호하는 장르🔍"}</TitleText>
            {categoryData ? (
                <ResponsiveCirclePacking
                    data={categoryData}
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
            ) : (
                <div className="m-auto text-center text-xl font-semibold text-main-gray">
                    {"좀 더 기록해주시면"}
                    <br />
                    {"성향을 알 수 있을 것 같아요!"}
                </div>
            )}
        </div>
    )
}
