export default function Loading() {
    return (
        <div className="flex animate-pulse flex-col gap-6">
            <div className="flex flex-row items-center justify-between gap-4">
                {/* <CircleChart bookList={combinedList} /> */}
                <div className="flex h-72 flex-1 flex-col">
                    <div className="mb-4 h-8 w-48 rounded-lg bg-gray-200" />
                    <div className="m-auto h-60 w-60 rounded-full bg-gray-200" />
                </div>
                {/* <BarChart bookList={combinedList} /> */}
                <div className="flex flex-col gap-6">
                    <div className="h-8 w-48 rounded-lg bg-gray-200" />
                    <div className="h-6 w-96 rounded-lg bg-gray-200" />
                    <div className="h-6 w-96 rounded-lg bg-gray-200" />
                    <div className="h-6 w-96 rounded-lg bg-gray-200" />
                </div>
            </div>
            <div className="flex flex-row justify-between gap-4">
                {/* <MyBooks bookList={combinedList} /> */}
                <div className="grid grid-cols-4">
                    <div className="mb-6 flex flex-col">
                        <div className="h-64 w-44 rounded-lg bg-gray-200" />
                        <div className="mt-2 h-6 w-44 rounded-lg bg-gray-200" />
                        <div className="h-6 w-44 rounded-lg bg-gray-200" />
                    </div>
                </div>
                {/* <History bookList={combinedList} /> */}
                <div className="flex w-60 flex-col gap-6">
                    <div className="h-8 w-48 rounded-lg bg-gray-200" />
                </div>
            </div>
        </div>
    )
}
