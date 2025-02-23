import { useState } from "react"

import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, getDay, subMonths, addMonths, addDays } from "date-fns"

import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md"

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
    const handleDate = (month: number) => {
        if (month == 1)
            setCurrentDate(subMonths(currentDate, 1)) // prev month
        else if (month == -1) setCurrentDate(addMonths(currentDate, 1)) // next month
    }
    const [selectedDate, setSelectedDate] = useState<string>("")
    return (
        <div className={`bg-white shadow-lg rounded-md ${className} text-black`}>
            <div className="p-2">
                <div className=" px-1.5 flex flex-row justify-between items-center">
                    <div>{`${currentDate.getFullYear()}년 ${currentMonth}월`}</div>
                    <div className="flex flex-row">
                        <MdOutlineKeyboardArrowLeft className="w-6 h-6 cursor-pointer" onClick={() => setCurrentDate(subMonths(currentDate, 1))} />
                        <MdOutlineKeyboardArrowRight className="w-6 h-6 cursor-pointer" onClick={() => setCurrentDate(addMonths(currentDate, 1))} />
                    </div>
                </div>
                <div className="grid grid-cols-7 justify-items-center gap-x-2">
                    {weeks.map(week => (
                        <div key={week} className="w-9 h-8 text-main-gray flex items-center justify-center border border-transparent">
                            {week}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 justify-items-center gap-x-2">
                    {daysInMonth.map((date, index) => (
                        <div
                            key={index}
                            className={`text-black rounded-md w-9 h-8 flex items-center justify-center border border-transparent cursor-pointer hover:border-blue-500 ${currentMonth != parseInt(date.month) && "text-main-gray"} ${selectedDate === date.date ? "bg-blue-500 text-white" : "hover:bg-blue-100"}                              }`}
                            onClick={() => {
                                setSelectedDate(date.date)
                                handleDate(currentMonth - parseInt(date.month))
                            }}>
                            {`${date.day}`}
                        </div>
                    ))}
                </div>
            </div>
            <div className="border-t  cursor-pointer">
                <div className="p-1 m-1 pl-2 rounded-lg hover:bg-zinc-100 active:bg-zinc-200">{"종료일"}</div>
            </div>
            <div className="border-t  cursor-pointer">
                <div className="p-1 m-1 pl-2 rounded-lg hover:bg-zinc-100 active:bg-zinc-200">{"삭제"}</div>
            </div>
        </div>
    )
}
