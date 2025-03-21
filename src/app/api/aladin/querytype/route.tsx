import { NextResponse, NextRequest } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const queryType = body.queryType
        const category = body.category

        const response = await fetch(
            `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${process.env.ALADIN_TTB_KEY}&QueryType=${queryType}&cover=big&Version=20131101&SearchTarget=Book&output=js&MaxResults=20&CategoryId=${category}`
        )
        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
