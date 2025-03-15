export default function Loading() {
    return (
        <div className="flex flex-col gap-2">
            {[0, 1, 2].map(i => (
                <div key={i} className="flex gap-2 border-b-2">
                    <div className="flex animate-pulse gap-6 border-b-2 pb-6">
                        <div className="m-4 h-72 w-48 rounded-lg bg-gray-200"></div>
                        <div className="flex flex-col justify-center gap-2">
                            <div className="mt-2 h-8 w-32 rounded bg-gray-200" />
                            <div className="mt-2 h-4 w-36 rounded bg-gray-200" />
                            <div className="mt-2 h-4 w-48 rounded bg-gray-200" />
                            <div>
                                <div className="mt-2 h-6 w-48 rounded bg-gray-200" />
                                <div className="mt-2 h-6 w-48 rounded bg-gray-200" />
                                <div className="mt-2 h-6 w-48 rounded bg-gray-200" />
                            </div>
                        </div>
                    </div>
                    <div className="ml-auto mr-5 flex flex-col justify-center gap-5">
                        <div className="h-10 w-40 rounded-lg bg-gray-200"></div>
                        <div className="h-10 w-40 rounded-lg bg-gray-200"></div>
                    </div>
                </div>
            ))}
        </div>
    )
}
