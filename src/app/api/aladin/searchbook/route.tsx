import { NextResponse, NextRequest } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const isbn13 = body.isbn13
        const response = await fetch(
            `http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${process.env.NEXT_PUBLIC_ALADIN_TTB_KEY}&ItemId=${isbn13}&ItemIdType=ISBN13&cover=big&output=js`
        )
        let data = await response.text()
        data = data.replace(/\\/g, "")
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
