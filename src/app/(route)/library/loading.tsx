export default function Loading() {
    return (
        <div className="flex animate-pulse flex-col gap-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row">
                {/* <CircleChart bookList={combinedList} /> */}
                <div className="flex h-72 flex-1 flex-col">
                    <div className="mb-4 h-8 w-60 rounded-lg bg-gray-200" />
                    <div className="m-auto h-48 w-48 rounded-full bg-gray-200" />
                </div>
                {/* <BarChart bookList={combinedList} /> */}
                <div className="mt-10 flex w-full flex-col">
                    <div className="h-8 w-60 rounded-lg bg-gray-200" />
                    <div className="mx-8 mt-8 flex flex-col items-center gap-6">
                        <div className="h-6 w-full rounded-lg bg-gray-200" />
                        <div className="h-6 w-full rounded-lg bg-gray-200" />
                        <div className="h-6 w-full rounded-lg bg-gray-200" />
                    </div>
                </div>
            </div>
            <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row">
                {/* <MyBooks bookList={combinedList} /> */}
                <div className="flex flex-1 flex-col gap-6">
                    <div className="h-8 w-60 rounded-lg bg-gray-200" />
                    <div className="flex gap-2 overflow-x-auto sm:flex-wrap">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
                            <div key={item} className="mb-6 flex flex-col gap-2">
                                <div className="h-48 w-32 rounded-lg bg-gray-200 sm:h-60 sm:w-40" />
                                <div className="h-6 w-32 rounded-lg bg-gray-200" />
                                <div className="h-6 w-28 rounded-lg bg-gray-200" />
                            </div>
                        ))}
                    </div>
                </div>
                {/* <History bookList={combinedList} /> */}
                <div className="flex w-60 flex-col gap-6">
                    <div className="h-8 w-56 rounded-lg bg-gray-200" />
                    <ul className="flex flex-col gap-3">
                        {[1, 2, 3].map(item => (
                            <li className="flex flex-col gap-2" key={item}>
                                <div className="h-8 w-36 rounded-lg bg-gray-200 text-xl font-bold" />
                                <div className="h-6 w-28 rounded-lg bg-gray-200 font-semibold text-main-gray" />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
