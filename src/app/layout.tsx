import Head from "next/head"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import Header from "@/app/_components/Header/Header"
import React from "react"
import Providers from "@/store/Provider"

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })

export default function RootLayout({ children, modal }: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
    return (
        <html lang="en">
            <Head>
                <title>{"리멤북"}</title>
                <meta name="description" content={"리멤북으로 읽은 책을 기록해 보세요"} />
                <meta name="google-site-verification" content="huSHYvBftuJFa028T6tGdShVcrWecu4qHuQWqhyKrmU" />
            </Head>
            <body className={inter.className}>
                <Providers>
                    <Header />
                    <div className="m-auto max-w-5xl pt-24">
                        {children}
                        {modal}
                    </div>
                </Providers>
            </body>
        </html>
    )
}
