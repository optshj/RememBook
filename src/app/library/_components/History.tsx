import TitleText from "./TitleText"

export default function History() {
    return (
        <div className="flex flex-col gap-6">
            <TitleText>{"최근 독서기록🧾"}</TitleText>
            <ul className="flex flex-col gap-3">
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
            </ul>
        </div>
    )
}
function Item() {
    return (
        <li className="flex flex-col">
            <div className="text-xl font-bold">{"채식주의자"}</div>
            <div className="font-semibold text-main-gray">{"2025.01.18"}</div>
        </li>
    )
}
