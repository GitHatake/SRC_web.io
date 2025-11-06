import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Zen_Maru_Gothic } from 'next/font/google'

// Zen Maru Gothicのみを最適化設定で読み込む
const zenMaruGothic = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-zen-maru-gothic",
  display: 'swap', // フォント読み込み中もテキストを表示
  preload: true, // 優先的に読み込む
  adjustFontFallback: true, // フォールバックフォントのサイズ調整
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
        url: `${basePath}/SRC_SNS4.png`,
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
    images: [`${siteUrl}/SRC_SNS4.png`],
  },
  verification: {
    google: 'e5ur5CeRsnVwqIMVWZ7DR0jj9D_A-jFgiwymzl1HGEE',
  },
  // パフォーマンス最適化のメタデータを追加
  other: {
    'color-scheme': 'light',
  },
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        {/* DNS解決を事前に行い、フォント読み込みを高速化 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${zenMaruGothic.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
