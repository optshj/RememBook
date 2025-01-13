import MainItemList from "@/components/Items/MainItemList"

export default function Home() {
    return (
        <div>
            <MainItemList queryType="Bestseller" title="베스트셀러!" />
            <MainItemList queryType="ItemNewSpecial" title="주목할만한 신간" />
            <MainItemList queryType="BlogBest" title="블로그 베스트" />
        </div>
    )
}
