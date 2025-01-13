import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header/Header"
import React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "RememBook",
    description: ""
}

export default function RootLayout({ children, modal }: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Header />
                <div className="pt-16">
                    {children}
                    {modal}
                </div>
            </body>
        </html>
    )
}
