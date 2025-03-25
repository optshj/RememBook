import { NextResponse, NextRequest } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const query = body.query
        const response = await fetch(
            `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${process.env.ALADIN_TTB_KEY}&Query=${query}&searchTarget=Book&output=js&Cover=big&sort=SalesPoint&MaxResults=100&version=20131101`
        )
        let data = await response.text()
        data = data.replace(/\\[abfnrtv0'"\\]/g, "")
        if (data.endsWith(";")) {
            data = data.slice(0, -1)
        }
        data = JSON.parse(data)
        return NextResponse.json(data)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
