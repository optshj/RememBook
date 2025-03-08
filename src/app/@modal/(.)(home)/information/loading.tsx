import Modal from "@/app/_components/Modal/Modal"

export default function Loading() {
    return (
        <Modal>
            <div className="flex w-[700px] flex-col gap-6 rounded-lg bg-white p-8 shadow-lg">
                <div className="flex animate-pulse gap-6 border-b-2 pb-6">
                    <div className="relative h-72 w-48 flex-shrink-0">
                        <div className="h-72 w-48 rounded-lg bg-gray-200"></div>
                    </div>
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
                    <div className="h-60 w-[636px] bg-gray-200"></div>
                    <div className="mt-2 flex flex-row items-center justify-center gap-2">
                        <div className="h-8 w-[100px] rounded-2xl bg-gray-200"></div>
                        <div className="h-8 w-[100px] rounded-2xl bg-gray-200"></div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
