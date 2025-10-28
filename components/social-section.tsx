"use client"

import { Instagram, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

export default function SocialSection() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

  const instagramUsername = "src._.shizuoka"

  // TODO: 以下のdata-ref値を、EmbedSocialで作成したウィジェットのdata-ref値に置き換えてください
  const embedSocialDataRef = "3b2c250e501a9937520e112aa1e97ac9616befa6"

  useEffect(() => {
    // 既にスクリプトが読み込まれている場合はスキップ
    if (document.getElementById("EmbedSocialHashtagScript")) {
      return
    }

    const script = document.createElement("script")
    script.id = "EmbedSocialHashtagScript"
    script.src = "https://embedsocial.com/cdn/ht.js"
    script.async = true
    document.head.appendChild(script)

    return () => {
      // クリーンアップ: コンポーネントがアンマウントされたときにスクリプトを削除
      const existingScript = document.getElementById("EmbedSocialHashtagScript")
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [])

  // 埋め込みコードがある場合はそれを使用
  if (embedSocialDataRef) {
    return (
      <div className="w-full">
        <div className="embedsocial-hashtag" data-ref={embedSocialDataRef}>
          <a
            className="feed-powered-by-es feed-powered-by-es-slider-img es-widget-branding"
            href="https://embedsocial.jp/"
            target="_blank"
            rel="noopener noreferrer"
            title="EmbedSocialで作成しました"
          >
            <img src={`${basePath}/images/design-mode/embedsocial-logo.webp`} alt="EmbedSocial" />
            <div className="es-widget-branding-text">EmbedSocialで作成しました</div>
          </a>
        </div>
      </div>
    )
  }

  // デフォルト: Instagramプロフィールへのリンクと説明を表示
  return (
    <div className="bg-white rounded-lg shadow-md p-8 border border-neutral-200">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center">
          <Instagram className="w-10 h-10 text-white" />
        </div>

        <div>
          <h3 className="text-2xl font-bold text-neutral-800 mb-2">Instagramで活動をチェック</h3>
          <p className="text-neutral-600 mb-4">最新の活動写真や動画をInstagramで公開しています</p>
        </div>

        <Button
          asChild
          size="lg"
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white"
        >
          <a
            href={`https://www.instagram.com/${instagramUsername}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Instagram className="w-5 h-5" />
            Instagramを見る
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 text-left w-full max-w-2xl">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <Instagram className="w-4 h-4" />
            Instagram埋め込みの設定方法
          </h4>
          <div className="text-sm text-blue-800 space-y-2">
            <p>
              <strong>方法1: アカウント名を設定</strong>
              <br />
              <code className="bg-blue-100 px-2 py-1 rounded text-xs">components/social-section.tsx</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
