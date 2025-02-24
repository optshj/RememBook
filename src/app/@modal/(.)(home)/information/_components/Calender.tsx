import { useState } from "react"
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, getDay, subMonths, addMonths, addDays } from "date-fns"

import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md"

import ToggleButton from "@/components/Button/ToggleButton"

interface CalenderProps {
    className?: string
}
export default function Calender({ className }: CalenderProps) {
    const [currentDate, setCurrentDate] = useState(new Date())
    const currentMonth = currentDate.getMonth() + 1
    const weeks = ["일", "월", "화", "수", "목", "금", "토"]
    const startCurrentMonth = startOfMonth(currentDate)
    const endCurrentMonth = endOfMonth(currentDate)
    const startOfFirstWeek = startOfWeek(startCurrentMonth, { weekStartsOn: 0 })
    const endOfLastWeek = addDays(endOfWeek(endCurrentMonth, { weekStartsOn: 0 }), 7)

    const days = eachDayOfInterval({
        start: startOfFirstWeek,
        end: endOfLastWeek
    })
    const daysInMonth = days.map(day => ({
        date: format(day, "yyyy-MM-dd"),
        year: format(day, "yyyy"),
        month: format(day, "MM"),
        day: format(day, "dd"),
        dayIndexOfWeek: getDay(day)
    }))

    const [isEnded, setIsEnded] = useState(false)
    const [startDate, setStartDate] = useState<string>(daysInMonth[0].date)
    const [endDate, setEndDate] = useState<string | null>(daysInMonth[0].date)

    const handleDate = (month: number) => {
        if (month == 1) {
            setCurrentDate(subMonths(currentDate, 1)) // prev month
        } else if (month == -1) {
            setCurrentDate(addMonths(currentDate, 1)) // next month
        }
    }

    const handleDateClick = (date: string) => {
        if (isEnded) {
            if (!startDate || date < startDate) {
                setStartDate(date)
            } else {
                setEndDate(date)
            }
        } else {
            setStartDate(date)
            setEndDate(null)
        }
    }
    return (
        <div className={`bg-white shadow-lg rounded-md font-normal text-black ${className}`}>
            <div className="p-2">
                {isEnded ? (
                    <div className="flex flex-row justify-center gap-2 mb-2">
                        <div className="flex-1 rounded-md bg-zinc-100 border-zinc-200 border px-1.5 py-1">{startDate}</div>
                        <div className="flex-1 rounded-md bg-zinc-100 border-zinc-200 border px-1.5 py-1">{endDate}</div>
                    </div>
                ) : (
                    <div className="rounded-md bg-zinc-100 border-zinc-200 border mb-2 px-1.5 py-1">{startDate}</div>
                )}
                <div className="px-2 flex flex-row justify-between items-center">
                    <div>{`${currentDate.getFullYear()}년 ${currentMonth}월`}</div>
                    <div className="flex flex-row">
                        <MdOutlineKeyboardArrowLeft
                            className="w-6 h-6 cursor-pointer rounded-md hover:bg-zinc-200"
                            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                        />
                        <MdOutlineKeyboardArrowRight
                            className="w-6 h-6 cursor-pointer rounded-md hover:bg-zinc-200"
                            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-[repeat(7,auto)] justify-items-center">
                    {weeks.map(week => (
                        <div key={week} className="w-9 h-8 text-main-gray flex items-center justify-center border border-transparent">
                            {week}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-[repeat(7,auto)] justify-items-center">
                    {daysInMonth.map((date, index) => {
                        const isStartDate = new Date(date.date).getTime() === new Date(startDate).getTime()
                        const isEndDate = endDate && new Date(date.date).getTime() === new Date(endDate).getTime()
                        const isInRange =
                            isEnded &&
                            endDate &&
                            new Date(date.date).getTime() > new Date(startDate).getTime() &&
                            new Date(date.date).getTime() < new Date(endDate).getTime()
                        return (
                            <div
                                key={index}
                                className={`text-black rounded-md w-9 h-8 flex items-center justify-center border-2 border-transparent cursor-pointer hover:border-blue-500 
                                    ${isInRange && "bg-blue-200 rounded-none"}
                                    ${isStartDate || isEndDate ? "bg-blue-500 text-white" : "hover:bg-blue-100"} 
                                        ${currentMonth != parseInt(date.month) && "text-main-gray"} 
                                        `}
                                onClick={() => {
                                    handleDateClick(date.date)
                                    handleDate(currentMonth - parseInt(date.month))
                                }}>
                                {`${date.day}`}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="border-t cursor-pointer ">
                <div
                    className=" p-1 m-1 pl-2 rounded-lg flex items-center justify-between hover:bg-zinc-100 active:bg-zinc-200"
                    onClick={() => {
                        setIsEnded(prev => !prev)
                        setEndDate(startDate)
                    }}>
                    {"종료일"}
                    <ToggleButton state={isEnded} />
                </div>
            </div>
            <div className="border-t cursor-pointer">
                <div className="p-1 m-1 pl-2 rounded-lg hover:bg-zinc-100 active:bg-zinc-200">{"삭제"}</div>
            </div>
        </div>
    )
}
