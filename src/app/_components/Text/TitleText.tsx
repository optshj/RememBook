export default function TitleText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return <h1 className={`whitespace-nowrap text-2xl font-bold ${className}`}>{children}</h1>
}
