export default function NoResult({ query }: { query: string }) {
    return (
        <div className="mt-10 flex w-full flex-col items-center justify-center gap-1 text-xl font-semibold">
            <div>
                <span className="text-red-500">{`\`${query}\``}</span>
                {`에 대한 검색 결과가 없습니다.`}
            </div>
            <div>{"다른 검색어를 입력하시거나"}</div>
            <div>{"철자와 띄어쓰기를 확인해보세요."}</div>
        </div>
    )
}
