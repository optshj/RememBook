export default function Loading() {
    return (
        <div className="space-y-4">
            {[0, 1, 2].map(i => (
                <div key={i} className="relative flex flex-col gap-4 animate-pulse ">
                    {/* title */}
                    <div className="mt-2 max-w-60 h-8 bg-gray-200 rounded" />
                    {/* images */}
                    <div className="flex gap-4 overflow-x-auto">
                        {[0, 1, 2, 3, 4].map(index => (
                            <div key={index} className="relative flex flex-col">
                                <div className="w-48 h-72 bg-gray-200 rounded-lg" />
                                <div className="w-24 mt-2 h-5 bg-gray-200 rounded" />
                                <div className="w-32 mt-2 h-5 bg-gray-200 rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
