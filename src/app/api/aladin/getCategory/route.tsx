import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import Papa from "papaparse"

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), "public", "data", "AladinCategory.csv")
        const fileContent = fs.readFileSync(filePath, "utf8")
        const parsedData = Papa.parse(fileContent, { header: true })
        return NextResponse.json(parsedData.data)
    } catch (error) {
        return NextResponse.json({ error: "Failed to read CSV file" }, { status: 500 })
    }
}
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const cid = body.cid
        const filePath = path.join(process.cwd(), "public", "data", "AladinCategory.csv")
        const fileContent = fs.readFileSync(filePath, "utf8")
        const parsedData = Papa.parse<{ cid: string }>(fileContent, { header: true }).data
        const result = parsedData.find(row => row.cid === cid)

        return NextResponse.json(result ? result : { error: "No matching category found" })
    } catch (error) {
        return NextResponse.json({ error: "Failed to read CSV file" }, { status: 500 })
    }
}
