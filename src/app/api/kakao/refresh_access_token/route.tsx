import { cookies } from "next/headers"
import { NextResponse, NextRequest } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const refreshToken = body.refreshToken
        const response = await fetch(
            `https://kauth.kakao.com/oauth/token?grant_type=refresh_token&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_KEY}&refresh_token=${refreshToken}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" }
            }
        )
        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
