import { useState, Dispatch, SetStateAction, useEffect } from "react"
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, getDay, subMonths, addMonths, addDays } from "date-fns"

import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md"

import ToggleButton from "@/app/_components/Button/ToggleButton"

interface CalenderProps {
    className?: string
    date: string
    setOpen: Dispatch<SetStateAction<number>>
    setData: Dispatch<
        SetStateAction<{
            rating: number
            date: string
            state: number
            categoryId: number
            title: string
            author: string
        }>
    >
}
export default function Calender({ className, date, setOpen, setData }: CalenderProps) {
    const dateformat = "yyyy.MM.dd"
    const [currentDate, setCurrentDate] = useState<Date>(new Date())
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
        date: format(day, dateformat),
        year: format(day, "yyyy"),
        month: format(day, "MM"),
        day: format(day, "dd"),
        dayIndexOfWeek: getDay(day)
    }))
    const handleDate = (month: number) => {
        //prev month
        if (month == 1) setCurrentDate(subMonths(currentDate, 1))
        //next month
        else if (month == -1) setCurrentDate(addMonths(currentDate, 1))
    }

    const [isEnded, setIsEnded] = useState(false)
    const [startDate, setStartDate] = useState<string>(format(currentDate, dateformat))
    const [endDate, setEndDate] = useState<string>(format(currentDate, dateformat))
    const [selectedDates, setSelectedDates] = useState<string[]>([])

    useEffect(() => {
        if (!date) return
        const dateList = date.split(" ~ ")
        setCurrentDate(new Date(dateList[0]))
        setStartDate(dateList[0])
        setEndDate(dateList.length > 1 ? dateList[1] : date)
    }, [date])

    const handleDateClick = (date: string) => {
        let updatedDates: string[]

        if (!isEnded) {
            updatedDates = [date]
        } else {
            updatedDates = [...selectedDates, date]
            if (updatedDates.length > 2) {
                updatedDates = updatedDates.slice(1)
            }
        }

        const sortedDates = [...updatedDates].sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
        const [start, end] = sortedDates.length === 2 ? sortedDates : [sortedDates[0], sortedDates[0]]

        setSelectedDates(updatedDates)
        setStartDate(start)
        setEndDate(end)

        setData(prev => ({
            ...prev,
            date: start === end ? start : `${start} ~ ${end}`
        }))
    }

    return (
        <div className={`absolute z-50 rounded-md bg-white font-normal text-black shadow-lg ${className}`}>
            <div className="p-2">
                {isEnded ? (
                    <div className="mb-2 flex flex-row justify-center gap-2">
                        <div className="flex-1 rounded-md border border-zinc-200 bg-zinc-100 px-1.5 py-1">{startDate}</div>
                        <div className="flex-1 rounded-md border border-zinc-200 bg-zinc-100 px-1.5 py-1">{endDate}</div>
                    </div>
                ) : (
                    <div className="mb-2 rounded-md border border-zinc-200 bg-zinc-100 px-1.5 py-1">{startDate}</div>
                )}
                <div className="flex flex-row items-center justify-between px-2">
                    <div>{`${currentDate.getFullYear()}년 ${currentMonth}월`}</div>
                    <div className="flex flex-row">
                        <MdOutlineKeyboardArrowLeft
                            className="h-6 w-6 cursor-pointer rounded-md hover:bg-zinc-200"
                            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                        />
                        <MdOutlineKeyboardArrowRight
                            className="h-6 w-6 cursor-pointer rounded-md hover:bg-zinc-200"
                            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-[repeat(7,auto)] justify-items-center">
                    {weeks.map(week => (
                        <div key={week} className="flex h-6 w-7 items-center justify-center border border-transparent text-main-gray sm:h-8 sm:w-9">
                            {week}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-[repeat(7,auto)] justify-items-center">
                    {daysInMonth.map((date, index) => {
                        const isInRange =
                            isEnded &&
                            new Date(date.date).getTime() > new Date(startDate).getTime() &&
                            new Date(date.date).getTime() < new Date(endDate).getTime()
                        return (
                            <div
                                key={index}
                                className={`flex h-6 w-7 cursor-pointer items-center justify-center rounded-md border-2 border-transparent text-black hover:border-blue-500 sm:h-8 sm:w-9 ${isInRange && "rounded-none bg-blue-200"} ${date.date === startDate || (isEnded && date.date === endDate) ? "bg-blue-500 text-white" : "hover:bg-blue-100"} ${currentMonth != parseInt(date.month) && "text-main-gray"} `}
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
            <div className="cursor-pointer border-t">
                <div
                    className="m-1 flex items-center justify-between rounded-lg p-1 pl-2 hover:bg-zinc-100 active:bg-zinc-200"
                    onClick={() => {
                        setIsEnded(prev => !prev)
                        setData(prev => ({ ...prev, date: isEnded ? startDate : `${startDate} ~ ${endDate}` }))
                    }}>
                    {"종료일"}
                    <ToggleButton state={isEnded} />
                </div>
            </div>
            <div
                className="cursor-pointer border-t"
                onClick={e => {
                    setData(prev => ({ ...prev, date: "" }))
                    e.stopPropagation()
                    setOpen(0)
                }}>
                <div className="m-1 rounded-lg p-1 pl-2 hover:bg-zinc-100 active:bg-zinc-200">{"삭제"}</div>
            </div>
            <div
                className="cursor-pointer border-t"
                onClick={e => {
                    e.stopPropagation()
                    setOpen(0)
                }}>
                <div className="m-1 rounded-lg p-1 pl-2 hover:bg-zinc-100 active:bg-zinc-200">{"닫기"}</div>
            </div>
        </div>
    )
}
