interface ToggleButtonProps {
    className?: string
    onClick?: () => void
    state?: boolean
}
/**
 * @param {string} className - button class
 * @param {function} onClick - button click event
 * @param {boolean} state - button state
 * @returns {JSX.Element} - ToggleButton component
 */
export default function ToggleButton({ className = "", onClick, state }: ToggleButtonProps) {
    return (
        <div
            className={`flex w-10 items-center rounded-xl p-0.5 transition-all ${state ? "bg-blue-500" : "bg-zinc-400 hover:bg-zinc-500"} ${className}`}
            onClick={onClick}>
            <div className={`h-4 w-4 rounded-full bg-white transition-all duration-300 ${state && "translate-x-5"}`}></div>
        </div>
    )
}
