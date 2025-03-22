import Modal from "@/app/_components/Modal/Modal"

export default function Loading() {
    return (
        <Modal>
            <div className="mx-2 flex h-[100vh] w-[100vw] flex-col gap-6 rounded-lg bg-white p-8 shadow-lg sm:w-[calc(100vw-64px)] md:w-[750px]">
                <div className="flex animate-pulse gap-6 border-b-2 pb-6">
                    <div className="relative h-48 w-32 flex-shrink-0 rounded-lg bg-gray-200 sm:h-72 sm:w-48" />
                    <div className="flex flex-col justify-center gap-2">
                        <div className="mt-2 h-8 w-32 rounded bg-gray-200" />
                        <div className="mt-2 h-4 w-36 rounded bg-gray-200" />
                        <div className="mt-2 h-4 w-48 rounded bg-gray-200" />
                        <div>
                            <div className="mt-2 h-4 w-44 rounded bg-gray-200" />
                            <div className="mt-2 h-4 w-44 rounded bg-gray-200" />
                            <div className="mt-2 h-4 w-44 rounded bg-gray-200" />
                        </div>
                    </div>
                </div>
                <div className="flex animate-pulse flex-col">
                    <div className="h-60 w-full rounded-lg bg-gray-200 p-4" />
                    <div className="mt-2 flex flex-row items-center justify-center gap-2">
                        <div className="h-8 w-[110px] rounded-lg bg-gray-200" />
                        <div className="h-8 w-[110px] rounded-lg bg-gray-200" />
                    </div>
                </div>
            </div>
        </Modal>
    )
}
