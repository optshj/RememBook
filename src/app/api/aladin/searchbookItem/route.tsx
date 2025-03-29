import { NextResponse, NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl

        const isbn13 = searchParams.get("isbn13")
        const response = await fetch(
            `http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${process.env.ALADIN_TTB_KEY}&ItemId=${isbn13}&ItemIdType=ISBN13&cover=big&output=js&version=20131101`
        )
        let data = await response.text()
        data = data.replace(/\\[abfnrtv0'"\\]/g, "")
        if (data.endsWith(";")) {
            data = data.slice(0, -1)
        }
        data = JSON.parse(data).item[0]
        return NextResponse.json(data)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
