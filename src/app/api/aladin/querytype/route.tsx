import { NextResponse, NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl

        const queryType = searchParams.get("queryType") || "Bestseller"
        const category = searchParams.get("category") || "0"
        const maxResults = searchParams.get("maxResults") || "20"

        const response = await fetch(
            `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${process.env.ALADIN_TTB_KEY}&QueryType=${queryType}&cover=big&Version=20131101&SearchTarget=Book&output=js&MaxResults=${maxResults}&CategoryId=${category}`
        )
        const data = await response.json()

        return NextResponse.json(data)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
