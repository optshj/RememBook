export default function Loading() {
    return (
        <div className="relative -mx-6 flex h-[calc(100vh-134px)] w-screen bg-white sm:relative sm:h-[calc(100vh-220px)] sm:w-auto sm:rounded-2xl sm:p-10 sm:shadow-lg">
            <div className="absolute right-5 top-10 z-10 flex h-10 w-10 animate-pulse items-center rounded-full bg-gray-200 p-2 sm:w-28" />
            <div className="flex w-full animate-pulse flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex justify-center py-10">
                    <div className="h-72 w-48 flex-shrink-0 rounded-lg bg-gray-200 sm:h-96 sm:w-64" />
                </div>
                <div className="z-10 mt-4 flex w-full flex-col gap-2 p-4">
                    <div className="h-8 w-64 rounded-lg bg-gray-200" />
                    <div className="h-6 w-44 rounded-lg bg-gray-200" />
                    <div className="h-6 w-32 rounded-lg bg-gray-200" />
                    <div className="h-6 w-36 rounded-lg bg-gray-200" />
                    <div className="mt-4 h-28 w-full rounded-lg bg-gray-200" />
                </div>
            </div>
        </div>
    )
}
