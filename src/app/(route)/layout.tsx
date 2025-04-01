import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import PreventPress from "../_utils/PreventPress"

import Header from "@/app/_components/Header/Header"
import React from "react"
import Providers from "@/app/_store/Provider"
import TabBar from "../_components/TabBar/TabBar"

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })

export const metadata: Metadata = {
    title: "RememBOOK",
    keywords: "독서 기록 저장 리멤북 책 베스트셀러 추천",
    description: "리멤북으로 읽은 책을 기록해 보세요",
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
