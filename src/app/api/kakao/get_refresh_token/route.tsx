import { cookies } from "next/headers"
import { NextResponse, NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    try {
        const refreshToken = cookies().get("refresh_token")

        if (!refreshToken) {
            return NextResponse.json({ error: "Refresh token not found" }, { status: 400 })
        }

        return NextResponse.json({ refresh_token: refreshToken.value }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
