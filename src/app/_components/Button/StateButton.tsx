/**
 * @param state
 * - `"0"`: 시작 전 (빨간색 배경)
 * - `"1"`: 읽는 중 (파란색 배경)
 * - `"2"`: 완료 (녹색 배경)
 *
 * @example
 * <StateButton state={0} />
 */
interface StateButtonProps {
    className?: string
    state?: number
}
export default function StateButton({ className, state = 0 }: StateButtonProps) {
    const getStatusProps = () => {
        switch (state) {
            case 0:
                return {
                    backgroundColor: "#EFDBDD",
                    circleColor: "#D3706D",
                    text: "시작 전"
                }
            case 1:
                return {
                    backgroundColor: "#CCDEE8",
                    circleColor: "#5892B6",
                    text: "읽는 중"
                }
            case 2:
                return {
                    backgroundColor: "#DBEDDB",
                    circleColor: "#6C9B7D",
                    text: "완료"
                }
            default:
                return {
                    backgroundColor: "#EFDBDD",
                    circleColor: "#D3706D",
                    text: "시작 전"
                }
        }
    }

    const { backgroundColor, circleColor, text } = getStatusProps()
    return (
        <button className={`flex w-fit items-center gap-1 rounded-md px-1 py-0.5 ${className}`} style={{ backgroundColor }}>
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: circleColor }} />
            <div className="text-xs font-semibold text-black">{text}</div>
        </button>
    )
}
