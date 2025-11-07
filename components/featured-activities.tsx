"use client"

import { useState, useEffect } from "react"
import { Spinner } from "@/components/ui/spinner"
import { Calendar, MapPin, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Activity, GASActivity } from "@/types/activity"

export default function FeaturedActivities() {
  const [featuredActivities, setFeaturedActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFeaturedActivities() {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbyDHWudw4Bq1tfCoxE1r1sv669iDzS5WwAnimTFgk1vt8uaGUtRB4FVGvh4ujQGYqKSLA/exec",
        )
        const data: GASActivity[] = await response.json()

        const now = new Date()

        // フィルタリング条件
        const filtered = data.filter((item) => {
          // 1. カテゴリーが「活動記録」または「プロジェクト」
          const isTargetCategory = item.category === "活動記録" || item.category === "プロジェクト"

          // 2. 実施予定（開始日が未来）
          const isFuture = new Date(item.startTime) > now

          // 3. 参照元PDFのタイトルに「ポスター」が含まれる
          const hasPoster = item.sourcePdf?.title?.includes("ポスター") || false

          return isTargetCategory && isFuture && hasPoster
        })

        // Activity形式に変換
        const converted = filtered.map((item, index) => convertGASToActivity(item, index))

        // 開始日時が近い順にソート
        converted.sort((a, b) => new Date(a.startTime).getTime(
          
        ) - new Date(b.startTime).getTime())

        setFeaturedActivities(converted)
      } catch (error) {
        console.error("[v0] Failed to fetch featured activities:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedActivities()
  }, [])

  function convertGASToActivity(gasData: GASActivity, index: number): Activity {
    const now = new Date()
    const startTime = new Date(gasData.startTime)
    const endTime = new Date(gasData.endTime)

    let status: "scheduled" | "progress" | "completed"
    if (endTime < now) {
      status = "completed"
    } else if (startTime <= now && now <= endTime) {
      status = "progress"
    } else {
      status = "scheduled"
    }

    return {
      id: `featured-${index}`,
      title: gasData.title,
      category: gasData.category,
      subCategory: gasData.subCategory,
      status,
      description: gasData.description,
      startTime: gasData.startTime,
      endTime: gasData.endTime,
      location: gasData.location,
      pdfUrl: gasData.sourcePdf?.link,
      pdfTitle: gasData.sourcePdf?.title,
    }
  }

  // ローディング中
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner className="w-8 h-8" />
      </div>
    )
  }

  // 対象の活動がない場合は非表示
  if (featuredActivities.length === 0) {
    return null
  }

  return (
    <section className="scroll-mt-20 bg-gradient-to-br from-[#009bde]/5 to-[#77c49f]/5 rounded-xl p-8 shadow-lg border-l-4 border-[#009bde]">
      <h2 className="text-3xl font-bold mb-8 text-[#009bde] flex items-center gap-2">
        参加者募集中の活動
      </h2>

      <div className="space-y-8">
        {featuredActivities.map((activity) => (
          <div
            key={activity.id}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* 左側: PDFプレビュー */}
            <div className="order-2 lg:order-1 bg-neutral-50 flex items-center justify-center p-4">
              {activity.pdfUrl ? (
                <iframe
                  src={`${activity.pdfUrl.replace("/view", "/preview")}`}
                  className="w-full h-[500px] rounded border border-neutral-200"
                  title={`${activity.title} ポスター`}
                />
              ) : (
                <div className="text-neutral-400 text-center">
                  <p>ポスターが利用できません</p>
                </div>
              )}
            </div>

            {/* 右側: 活動概要 */}
            <div className="order-1 lg:order-2 p-6 flex flex-col justify-between">
              <div>
                {/* カテゴリー・サブカテゴリー */}
                <div className="flex gap-2 mb-3">
                  <span className="inline-block px-3 py-1 bg-[#009bde] text-white text-xs font-semibold rounded-full">
                    {activity.category}
                  </span>
                  {activity.subCategory && (
                    <span className="inline-block px-3 py-1 bg-[#77c49f] text-white text-xs font-semibold rounded-full">
                      {activity.subCategory}
                    </span>
                  )}
                </div>

                {/* タイトル */}
                <h3 className="text-2xl font-bold text-neutral-800 mb-4">{activity.title}</h3>

                {/* 説明 */}
                <p className="text-neutral-600 mb-6 leading-relaxed">{activity.description}</p>

                {/* 日時 */}
                <div className="flex items-start gap-2 mb-3 text-neutral-700">
                  <Calendar className="w-5 h-5 mt-0.5 text-[#009bde]" />
                  <div>
                    <p className="font-semibold">開催日時</p>
                    <p className="text-sm">
                      {new Date(activity.startTime).toLocaleString("ja-JP", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      {" 〜 "}
                      {new Date(activity.endTime).toLocaleString("ja-JP", {
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                {/* 場所 */}
                <div className="flex items-start gap-2 mb-6 text-neutral-700">
                  <MapPin className="w-5 h-5 mt-0.5 text-[#77c49f]" />
                  <div>
                    <p className="font-semibold">開催場所</p>
                    <p className="text-sm">{activity.location}</p>
                  </div>
                </div>
              </div>

              {/* PDFリンク */}
              {activity.pdfUrl && (
                <Button
                  asChild
                  className="w-full bg-[#009bde] hover:bg-[#0088cc] text-white"
                >
                  <a
                    href={activity.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    詳細ポスターを開く
                  </a>
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}