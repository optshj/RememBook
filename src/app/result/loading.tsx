export default function Loading() {
    return (
        <div className="flex flex-col gap-2">
            {[0, 1, 2].map(i => (
                <div key={i} className="flex border-b-2 gap-2">
                    <div className="flex gap-6 pb-6 border-b-2 animate-pulse">
                        <div className="w-48 h-72 m-4 bg-gray-200 rounded-lg"></div>
                        <div className="flex flex-col justify-center gap-2">
                            <div className="w-32 mt-2 h-8 bg-gray-200 rounded" />
                            <div className="w-36 mt-2 h-4 bg-gray-200 rounded" />
                            <div className="w-48 mt-2 h-4 bg-gray-200 rounded" />
                            <div>
                                <div className="w-48 mt-2 h-6 bg-gray-200 rounded" />
                                <div className="w-48 mt-2 h-6 bg-gray-200 rounded" />
                                <div className="w-48 mt-2 h-6 bg-gray-200 rounded" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 ml-auto justify-center mr-5">
                        <div className="w-40 h-10 bg-gray-200 rounded-lg"></div>
                        <div className="w-40 h-10 bg-gray-200 rounded-lg"></div>
                    </div>
                </div>
            ))}
        </div>
    )
}
