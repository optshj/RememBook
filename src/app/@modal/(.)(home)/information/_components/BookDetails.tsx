"use client"

import { useState } from "react"
import { FaStar } from "react-icons/fa6"
import StateButton from "@/components/Button/StateButton"

interface BookDetailsProps {
    isbn13: string
}

export default function BookDetails({ isbn13 }: BookDetailsProps) {
    const [open, setOpen] = useState(false)
    const [state, setState] = useState<0 | 1 | 2>(0)

    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 text-sm font-semibold text-main-gray">
                {"나의평가"}
                <FaStar className="text-yellow" />
                <div className="text-yellow">{"3.9"}</div>
            </div>
            <div className="text-sm font-semibold text-main-gray">{"읽은 기간 2024.12.27 ~ 2024.12.31"}</div>
            <div className="relative">
                <div className={`${open ? "invisible" : "visible"}`} onClick={() => setOpen(true)}>
                    <StateButton state={state} />
                </div>
                {open ?? (
                    <div className="absolute top-0 gap-2 flex flex-col">
                        <StateButton state={0} />
                        <StateButton state={1} />
                        <StateButton state={2} />
                    </div>
                )}
            </div>
        </div>
    )
}
