import type React from "react"
import "./globals.css"
import type { Metadata } from "next"

import { Zen_Maru_Gothic, Geist as V0_Font_Geist, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// Initialize fonts
const _geist = V0_Font_Geist({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] })

const zenMaruGothic = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-zen-maru-gothic",
})

const siteUrl = "https://githatake.github.io/SRC_web.io/";
const basePath = process.env.NODE_ENV === "production" ? "/SRC_web.io" : ""

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SRC 静岡ローバース会議 活動ポータル",
    template: `%s | SRC 静岡ローバース会議`,
  },
  description: "静岡県内のローバースカウト活動を支援する「静岡ローバース会議（SRC）」の公式ポータルサイト。活動記録、議事録、イベントスケジュールなどを公開しています。",
  keywords: ["ローバースカウト", "静岡", "静岡ローバース会議", "SRC", "ボーイスカウト", "活動記録"],
  openGraph: {
    title: "SRC 静岡ローバース会議 活動ポータル",
    description: "静岡ローバース会議の活動記録とスケジュール",
    url: "https://githatake.github.io/SRC_web.io/",
    siteName: "SRC 静岡ローバース会議",
    images: [
      {
        url: '${basePath}/SRC_SNS4.png', // OGP画像のパス (publicディレクトリに配置)
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "SRC 静岡ローバース会議 活動ポータル",
    description: "静岡ローバース会議の活動記録とスケジュール",
    images: [`${siteUrl}/SRC_SNS4.png`], // OGP画像の絶対パス
  },
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${zenMaruGothic.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
