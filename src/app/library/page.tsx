import MyBooks from "./_components/MyBooks"
import CircleChart from "./_components/CircleChart"
import History from "./_components/History"
import BarChart from "./_components/BarChart"

export default function Library() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row justify-between gap-4 items-center">
                <CircleChart />
                <BarChart />
            </div>
            <div className="flex flex-row justify-between gap-4">
                <MyBooks />
                <History />
            </div>
        </div>
    )
}
