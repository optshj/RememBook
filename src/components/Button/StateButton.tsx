"use client"
import { useState } from "react"
/**
 * @param state 현재 상태를 나타냅니다. 기본값은 `"0"`입니다.
 * - `"0"`: 시작 전 (빨간색 배경)
 * - `"1"`: 읽는 중 (파란색 배경)
 * - `"2"`: 완료 (녹색 배경)
 *
 * @example
 * <StateButton state={0} />
 */
interface StateButtonProps {
    state?: number
    className?: string
    onClick?: () => void
}
export default function StateButton({ state = 0, className = "", onClick }: StateButtonProps) {
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
        <button className={`flex items-center gap-1 px-1 py-0.5 rounded-md w-fit ${className}`} style={{ backgroundColor }} onClick={onClick}>
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: circleColor }} />
            <div className="text-xs font-semibold text-black">{text}</div>
        </button>
    )
}
