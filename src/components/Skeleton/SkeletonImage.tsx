export function SkeletonImage() {
    return (
        <div className={`max-w-sm w-full mx-auto h-full`}>
            <div className="bg-gray-300 animate-pulse rounded-lg w-full h-full"></div>
        </div>
    )
}
export function SkeletonText() {
    return <div className="animate-pulsemt-2 w-full h-5 bg-gray-200 rounded"></div>
}
export function SkeletonImageText() {
    return (
        <div className="relative flex flex-col w-full h-full animate-pulse">
            <div className="w-44 h-72 bg-gray-200 rounded-lg"></div>
            <div className="mt-2 h-5 bg-gray-200 rounded"></div>
            <div className="mt-1 h-4 bg-gray-200 rounded"></div>
        </div>
    )
}
