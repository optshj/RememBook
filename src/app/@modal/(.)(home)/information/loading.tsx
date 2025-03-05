import Modal from "@/components/Modal/Modal"

export default function Loading() {
    return (
        <Modal>
            <div className="flex flex-col gap-6 p-8 bg-white rounded-lg shadow-lg w-[700px]">
                <div className="flex gap-6 pb-6 border-b-2   animate-pulse">
                    <div className="relative w-48 h-72 flex-shrink-0">
                        <div className="w-48 h-72 bg-gray-200 rounded-lg"></div>
                    </div>
                    <div className="flex flex-col justify-center gap-2">
                        <div className="w-32 mt-2 h-8 bg-gray-200 rounded" />
                        <div className="w-36 mt-2 h-4 bg-gray-200 rounded" />
                        <div className="w-48 mt-2 h-4 bg-gray-200 rounded" />
                        <div>
                            <div className="w-44 mt-2 h-4 bg-gray-200 rounded" />
                            <div className="w-44 mt-2 h-4 bg-gray-200 rounded" />
                            <div className="w-44 mt-2 h-4 bg-gray-200 rounded" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col   animate-pulse">
                    <div className="w-[636px] h-60 bg-gray-200"></div>
                    <div className="flex flex-row items-center justify-center mt-2 gap-2">
                        <div className="w-[100px] h-8 bg-gray-200 rounded-2xl"></div>
                        <div className="w-[100px] h-8 bg-gray-200 rounded-2xl"></div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
