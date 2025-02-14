import { NextResponse } from "next/server"

export async function GET() {
    const response = NextResponse.json({ message: "Logged out" })

    //delete refresh token cookie
    response.cookies.set("refresh_token", "", { maxAge: 0, path: "/" })

    return response
}
