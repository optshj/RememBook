export default function Loading() {
    return (
        <div className="m-auto mt-9 w-[312px] 2xs:w-[416px] xs:w-[512px] sm:flex sm:w-auto sm:flex-col sm:gap-2">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => (
                <div key={i} className="m-1 my-3 inline-block animate-pulse sm:flex sm:flex-row sm:gap-2 sm:border-b-2">
                    <div className="h-36 w-24 rounded-lg bg-gray-200 xs:h-44 xs:w-[120px] sm:m-4 sm:h-72 sm:w-48" />
                    <div className="flex flex-col sm:my-10 sm:gap-2">
                        <div className="mt-1 h-5 w-20 rounded bg-gray-200 sm:h-8 sm:w-32" />
                        <div className="mt-1 h-4 w-12 rounded bg-gray-200 sm:w-24" />
                        <div className="mt-2 hidden h-4 w-44 rounded bg-gray-200 sm:inline-block" />

                        <div className="mt-6 hidden gap-2 sm:flex sm:flex-col">
                            <div className="h-6 w-48 rounded bg-gray-200" />
                            <div className="h-6 w-48 rounded bg-gray-200" />
                            <div className="h-6 w-48 rounded bg-gray-200" />
                        </div>
                    </div>
                    <div className="ml-auto mr-5 hidden flex-col justify-center gap-5 sm:flex">
                        <div className="h-10 w-40 rounded-lg bg-gray-200"></div>
                        <div className="h-10 w-40 rounded-lg bg-gray-200"></div>
                    </div>
                </div>
            ))}
        </div>
    )
}
