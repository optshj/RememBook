import BackArrow from "@/app/_components/Button/BackArrow"
import Modal from "@/app/_components/Modal/Modal"

export default function Loading() {
    return (
        <Modal>
            <div className="flex h-[100vh] w-[100vw] flex-col gap-6 bg-white p-4 shadow-lg sm:h-auto sm:w-[calc(100vw-64px)] sm:rounded-lg sm:p-8 md:w-[750px]">
                <BackArrow className="absolute left-2 top-2 z-20 h-6 w-6 sm:hidden" />
                <div className="flex animate-pulse flex-col sm:flex-row">
                    <div className="flex justify-center">
                        <div className="relative mt-10 h-72 w-48 flex-shrink-0 rounded-lg bg-gray-200 sm:mt-0" />
                    </div>
                    <div className="mt-10 flex flex-col justify-center gap-2 sm:pl-4">
                        <div className="mt-2 h-7 w-48 rounded bg-gray-200" />
                        <div className="mt-2 h-4 w-36 rounded bg-gray-200" />
                        <div className="mt-2 h-4 w-40 rounded bg-gray-200" />
                        <div className="mt-4">
                            <div className="mt-2 h-4 w-44 rounded bg-gray-200" />
                            <div className="mt-2 h-4 w-44 rounded bg-gray-200" />
                            <div className="mt-2 h-4 w-44 rounded bg-gray-200" />
                        </div>
                    </div>
                </div>
                <div className="flex animate-pulse flex-col border-t pt-6">
                    <div className="h-60 w-full rounded-lg bg-gray-200 p-4" />
                    <div className="mt-2 flex flex-row items-center justify-center gap-2">
                        <div className="h-8 w-24 rounded-lg bg-gray-200" />
                        <div className="h-8 w-24 rounded-lg bg-gray-200" />
                    </div>
                </div>
            </div>
        </Modal>
    )
}
