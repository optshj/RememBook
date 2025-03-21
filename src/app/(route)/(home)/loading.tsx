export default function Loading() {
    return (
        <div className="space-y-4">
            {[0, 1, 2].map(i => (
                <div key={i} className="relative flex animate-pulse flex-col gap-4">
                    {/* title */}
                    <div className="mt-2 h-8 max-w-60 rounded bg-gray-200" />
                    {/* images */}
                    <div className="flex gap-4 overflow-x-auto">
                        {[0, 1, 2, 3, 4].map(index => (
                            <div key={index} className="relative flex flex-col">
                                <div className="h-48 w-32 sm:h-72 sm:w-48 rounded-lg bg-gray-200" />
                                <div className="mt-2 h-5 w-24 rounded bg-gray-200" />
                                <div className="mt-2 h-5 w-32 rounded bg-gray-200" />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
