export default function NoResult({ query }: { query: string }) {
    return (
        <div className="w-full mt-10 flex flex-col items-center justify-center font-semibold text-xl gap-1">
            <div>
                <span className="text-red-500">{`\`${query}\``}</span>
                {`에 대한 검색 결과가 없습니다.`}
            </div>
            <div>{"다른 검색어를 입력하시거나"}</div>
            <div>{"철자와 띄어쓰기를 확인해보세요."}</div>
        </div>
    )
}
