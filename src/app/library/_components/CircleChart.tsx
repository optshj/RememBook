import { ResponsiveCirclePacking } from "@nivo/circle-packing"

import TitleText from "@/components/Text/TitleText"

import { CombinedBookType } from "@/types/BookType"

export default function CircleChart({ bookList }: { bookList: CombinedBookType[] }) {
    const data = {
        name: "Books",
        color: "#d9d9d9",
        children: [
            { name: "소설", loc: 120, color: "#74b9ff" },
            { name: "Non-Fiction", loc: 100, color: "#55efc4" },
            { name: "Technical", loc: 80, color: "#fdcb6e" },
            { name: "Biography", loc: 60, color: "#fab1a0" },
            { name: "Fantasy", loc: 90, color: "#a29bfe" }
        ]
    }
    return (
        <div className="flex h-72 flex-1 flex-col">
            <TitleText>{"선호하는 장르🔍"}</TitleText>
            <ResponsiveCirclePacking
                data={data}
                id="name"
                value="loc"
                colors={["#A57865", "#E4C7B9", "#F0F0E4", "#BAAA91", "#A28776"]}
                colorBy="id"
                padding={2}
                theme={{ text: { fontSize: 16 } }}
                leavesOnly={true}
                enableLabels={true}
                labelsSkipRadius={0}
            />
        </div>
    )
}
