export default function TitleText({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`text-2xl font-bold ${className}`}>{children}</div>
}
