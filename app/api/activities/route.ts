import { NextResponse } from "next/server"
import type { Activity, GroupedActivity } from "@/types/activity"

// GASからデータを取得してグループ化する関数
function groupActivities(activities: Activity[]): GroupedActivity[] {
  const grouped = new Map<string, GroupedActivity>()

  // 日付でソート（新しい順）
  const sorted = [...activities].sort((a, b) => {
    if (!a.date || !b.date) return 0
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  for (const activity of sorted) {
    // 議事録カテゴリの場合は個別に表示
    if (activity.category === "議事録") {
      const key = `${activity.category}-${activity.subCategory || activity.id}`
      if (!grouped.has(key)) {
        grouped.set(key, {
          id: key,
          title: activity.title,
          category: activity.category,
          subCategory: activity.subCategory,
          status: activity.status,
          count: 1,
          latestActivity: activity,
        })
      }
    } else {
      // その他のカテゴリはサブカテゴリでグループ化
      const key = `${activity.category}-${activity.subCategory || "default"}`
      if (!grouped.has(key)) {
        grouped.set(key, {
          id: key,
          title: activity.title,
          category: activity.category,
          subCategory: activity.subCategory,
          status: activity.status,
          count: 1,
          latestActivity: activity,
        })
      } else {
        const existing = grouped.get(key)!
        existing.count++
        // 最新の情報を保持
        if (
          !existing.latestActivity.date ||
          (activity.date && new Date(activity.date) > new Date(existing.latestActivity.date))
        ) {
          existing.latestActivity = activity
          existing.status = activity.status
        }
      }
    }
  }

  return Array.from(grouped.values())
}

export async function GET() {
  try {
    // TODO: 実際のGAS APIエンドポイントからデータを取得
    // const response = await fetch('YOUR_GAS_API_ENDPOINT')
    // const activities: Activity[] = await response.json()

    // デモデータ
    const activities: Activity[] = [
      {
        id: "1",
        title: "夏季キャンプ",
        category: "野外活動",
        subCategory: "キャンプ",
        status: "completed",
        summary: "2泊3日の夏季キャンプを実施しました。",
        date: "2024-08-10",
        location: "〇〇キャンプ場",
        pdfUrl: "#",
      },
    ]

    const grouped = groupActivities(activities)
    return NextResponse.json(grouped)
  } catch (error) {
    console.error("[v0] Error fetching activities:", error)
    return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 })
  }
}
