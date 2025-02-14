import TitleText from "./TitleText"

export default function BarChart() {
    return (
        <div className="flex flex-col">
            <TitleText>{"독서 리포트📈"}</TitleText>
            <div className="flex flex-col gap-6 mt-4">
                <Item />
                <Item />
                <Item />
            </div>
        </div>
    )
}

function Item() {
    return (
        <div className="flex flex-row gap-4">
            <div className="text-lg font-bold">{"8월"}</div>
            <div className="h-6 bg-gray-300 rounded-lg w-96">
                <div className="w-1/2 h-full rounded-lg bg-mocha"></div>
            </div>
            <div className="text-lg font-bold text-main-gray">{"1권"}</div>
        </div>
    )
}
