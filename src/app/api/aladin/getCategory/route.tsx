import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import Papa from "papaparse"

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), "public", "data", "AladinCategory.csv")
        const fileContent = fs.readFileSync(filePath, "utf8")
        const parsedData = Papa.parse<{ categoryId: string; categoryName: string }>(fileContent, { header: true }).data
        if (Array.isArray(parsedData)) {
            const categoryObj = parsedData.reduce<Record<string, string>>((acc, curr) => {
                acc[curr.categoryId] = curr.categoryName
                return acc
            }, {})
            return NextResponse.json(categoryObj)
        }
    } catch (error) {
        return NextResponse.json({ error: "Failed to read CSV file" }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const categoryIds: string[] = body.categoryIds

        const filePath = path.join(process.cwd(), "public", "data", "AladinCategory.csv")
        const fileContent = fs.readFileSync(filePath, "utf8")
        const parsedData = Papa.parse<{ categoryId: string; categoryName: string }>(fileContent, { header: true }).data

        const categoryDict: Record<string, string> = {}
        parsedData.forEach(row => {
            categoryDict[row.categoryId] = row.categoryName
        })
        const categoryMap = categoryIds.reduce<Record<string, string>>((acc, id) => {
            if (categoryDict[id]) acc[id] = categoryDict[id]
            return acc
        }, {})
        return NextResponse.json(categoryMap)
    } catch (error) {
        return NextResponse.json({ error: "Failed to read CSV file" }, { status: 500 })
    }
}
