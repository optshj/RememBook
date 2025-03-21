import { cookies } from "next/headers"
import { NextResponse, NextRequest } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const code = body.code
        const response = await fetch(
            `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_REST_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&code=${code}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" }
            }
        )
        const data = await response.json()
        cookies().set("refresh_token", data.refresh_token, { path: "/", httpOnly: false, secure: false })
        return NextResponse.json(data)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
