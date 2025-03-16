export default function Loading() {
    return (
        <div className="flex animate-pulse flex-col gap-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row">
                {/* <CircleChart bookList={combinedList} /> */}
                <div className="flex h-72 flex-1 flex-col">
                    <div className="mb-4 h-8 w-60 rounded-lg bg-gray-200" />
                    <div className="m-auto h-60 w-60 rounded-full bg-gray-200" />
                </div>
                {/* <BarChart bookList={combinedList} /> */}
                <div className="flex flex-col gap-6">
                    <div className="h-8 w-60 rounded-lg bg-gray-200" />
                    <div className="h-6 w-96 rounded-lg bg-gray-200" />
                    <div className="h-6 w-96 rounded-lg bg-gray-200" />
                    <div className="h-6 w-96 rounded-lg bg-gray-200" />
                </div>
            </div>
            <div className="flex flex-col justify-between gap-4 sm:flex-row">
                {/* <MyBooks bookList={combinedList} /> */}
                <div className="flex flex-1 flex-col gap-6">
                    <div className="mb-4 h-8 w-60 rounded-lg bg-gray-200" />
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
                            <div key={item} className="mb-6 flex flex-col gap-2">
                                <div className="h-64 w-44 rounded-lg bg-gray-200" />
                                <div className="h-6 w-40 rounded-lg bg-gray-200" />
                                <div className="h-6 w-36 rounded-lg bg-gray-200" />
                            </div>
                        ))}
                    </div>
                </div>
                {/* <History bookList={combinedList} /> */}
                <div className="flex w-60 flex-col gap-6">
                    <div className="h-8 w-60 rounded-lg bg-gray-200" />
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
