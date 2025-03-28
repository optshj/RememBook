import { NextResponse, NextRequest } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const isbn13List: string[] = body.isbn13List

        const responses = await Promise.all(
            isbn13List.map(async isbn13 => {
                const response = await fetch(
                    `http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${process.env.ALADIN_TTB_KEY}&ItemId=${isbn13}&ItemIdType=ISBN13&cover=big&output=js&version=20131101`
                )
                let data = await response.text()
                data = data.replace(/\\[abfnrtv0'"\\]/g, "")
                if (data.endsWith(";")) {
                    data = data.slice(0, -1)
                }
                return JSON.parse(data).item[0]
            })
        )
        return NextResponse.json(responses)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
