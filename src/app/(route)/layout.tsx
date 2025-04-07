import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

import PreventPress from "../_utils/PreventPress"

import Header from "@/app/_components/Header/Header"
import React from "react"
import Providers from "@/app/_store/Provider"
import TabBar from "../_components/TabBar/TabBar"

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 0,
    userScalable: false
}
export const metadata: Metadata = {
    title: "RememBOOK",
    description: "RememBOOK은 독서 기록을 저장하고 관리하는 웹 애플리케이션입니다. 책을 읽고 나서 간단한 메모를 남기고, 나중에 다시 확인할 수 있습니다.",
    keywords: "독서 기록 저장 리멤북 책 베스트셀러 추천",
    robots: "index, follow",
    icons: {
        icon: "/favicon.ico"
    },

    verification: {
        google: "huSHYvBftuJFa028T6tGdShVcrWecu4qHuQWqhyKrmU",
        other: {
            "naver-site-verification": "f937b54a380a929498fe45404504dabea4f393f1"
        }
    },
    openGraph: {
        title: "RememBOOK",
        locale: "ko_KR",
        siteName: "RememBOOK",
        url: "https://remem-book.vercel.app",
        type: "website"
    }
}

export default function RootLayout({ children, modal }: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-zinc-100`} spellCheck="false">
                <PreventPress />
                <Analytics />
                <SpeedInsights />
                <Providers>
                    <div className="mx-6 max-w-5xl py-16 sm:py-24 lg:m-auto">
                        <Header />
                        <TabBar />
                        {children}
                        {modal}
                    </div>
                </Providers>
            </body>
        </html>
    )
}
