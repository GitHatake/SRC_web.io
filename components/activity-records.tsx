"use client"

import { useState, useEffect } from "react"
import ActivityCard from "@/components/activity-card"
import ActivityDetailDialog from "@/components/activity-detail-dialog"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import type { Activity, GroupedActivity, GASActivity } from "@/types/activity"

interface ActivityRecordsProps {
  excludeMinutes?: boolean
}

export default function ActivityRecords({ excludeMinutes = false }: ActivityRecordsProps) {
  const [activities, setActivities] = useState<GroupedActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [showAll, setShowAll] = useState(false)
  const INITIAL_DISPLAY_COUNT = 6

  useEffect(() => {
    async function fetchActivities() {
      try {
        // TODO: 実際のGAS APIエンドポイントに置き換える
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbyDHWudw4Bq1tfCoxE1r1sv669iDzS5WwAnimTFgk1vt8uaGUtRB4FVGvh4ujQGYqKSLA/exec",
        )
        const data: GASActivity[] = await response.json()

        // GASデータをActivity形式に変換
        const convertedActivities = data.map((item, index) => convertGASToActivity(item, index))

        const filteredActivities = excludeMinutes
          ? convertedActivities.filter((a) => a.category !== "議事録")
          : convertedActivities.filter((a) => a.category === "議事録")

        const grouped = excludeMinutes ? groupActivities(filteredActivities) : createIndividualCards(filteredActivities)
        setActivities(grouped)
      } catch (error) {
        console.error("[v0] Failed to fetch activities:", error)
        // デモデータを使用
        setActivities(getDemoActivities(excludeMinutes))
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [excludeMinutes])

  function convertGASToActivity(gasData: GASActivity, index: number): Activity {
    const now = new Date()
    const startTime = new Date(gasData.startTime)
    const endTime = new Date(gasData.endTime)

    // 日時からステータスを自動判定
    let status: "scheduled" | "progress" | "completed"
    if (endTime < now) {
      status = "completed"
    } else if (startTime <= now && now <= endTime) {
      status = "progress"
    } else {
      status = "scheduled"
    }

    return {
      id: `activity-${index}`,
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

  function createIndividualCards(activities: Activity[]): GroupedActivity[] {
    return activities
      .sort((a, b) => new Date(b.endTime).getTime() - new Date(a.endTime).getTime())
      .map((activity) => ({
        id: activity.id,
        title: activity.title,
        category: activity.category,
        subCategory: activity.subCategory,
        status: activity.status,
        count: 1,
        latestActivity: activity,
        activities: [activity], // 全アクティビティを保持
      }))
  }

  function groupActivities(activities: Activity[]): GroupedActivity[] {
    const grouped = new Map<string, Activity[]>()

    activities.forEach((activity) => {
      const key = `${activity.category}-${activity.subCategory || "other"}`
      if (!grouped.has(key)) {
        grouped.set(key, [])
      }
      grouped.get(key)!.push(activity)
    })

    return Array.from(grouped.entries()).map(([key, items]) => {
      // 参照元ファイル名に基づく優先順位を判定する関数
      const getPriority = (activity: Activity): number => {
        const pdfTitle = activity.pdfTitle || ""
        if (pdfTitle.includes("計画書")) return 3
        if (pdfTitle.includes("企画書")) return 2
        return 1
      }

      // 優先順位でソートし、同じ優先順位の場合は日付（endTime）でソート
      const sorted = items.sort((a, b) => {
        const priorityDiff = getPriority(b) - getPriority(a)
        if (priorityDiff !== 0) return priorityDiff
        return new Date(b.endTime).getTime() - new Date(a.endTime).getTime()
      })

      const representative = sorted[0]

      return {
        id: key,
        title: representative.title,
        category: representative.category,
        subCategory: representative.subCategory,
        status: representative.status,
        count: items.length,
        latestActivity: representative,
        activities: sorted, // 全アクティビティを保持
      }
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner className="w-8 h-8" />
      </div>
    )
  }

  if (activities.length === 0) {
    return <div className="text-center py-12 text-neutral-500">活動記録がありません</div>
  }

  const displayedActivities = showAll ? activities : activities.slice(0, INITIAL_DISPLAY_COUNT)
  const hasMore = activities.length > INITIAL_DISPLAY_COUNT

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedActivities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            onClick={() => setSelectedActivity(activity.latestActivity)}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowAll(!showAll)}
            className="gap-2 hover:bg-[var(--color-scout-green)] hover:text-white transition-colors"
          >
            {showAll ? (
              <>
                <ChevronUp className="w-4 h-4" />
                閉じる
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                もっと見る ({activities.length - INITIAL_DISPLAY_COUNT}件)
              </>
            )}
          </Button>
        </div>
      )}

      <ActivityDetailDialog
        activity={selectedActivity}
        open={!!selectedActivity}
        onOpenChange={(open) => !open && setSelectedActivity(null)}
      />
    </>
  )
}

// デモデータ
function getDemoActivities(excludeMinutes: boolean): GroupedActivity[] {
  const allActivities = [
    {
      id: "1",
      title: "夏季キャンプ",
      category: "野外活動",
      subCategory: "キャンプ",
      status: "completed" as const,
      count: 1,
      latestActivity: {
        id: "1",
        title: "夏季キャンプ",
        category: "野外活動",
        subCategory: "キャンプ",
        status: "completed" as const,
        description: "2泊3日の夏季キャンプを実施しました。テント設営、野外炊飯、キャンプファイヤーなどを行いました。",
        startTime: "2024-08-10T10:00:00",
        endTime: "2024-08-12T15:00:00",
        location: "〇〇キャンプ場",
        pdfUrl: "#",
        pdfTitle: "夏季キャンプ計画書.pdf",
      },
      activities: [
        {
          id: "1",
          title: "夏季キャンプ",
          category: "野外活動",
          subCategory: "キャンプ",
          status: "completed" as const,
          description: "2泊3日の夏季キャンプを実施しました。テント設営、野外炊飯、キャンプファイヤーなどを行いました。",
          startTime: "2024-08-10T10:00:00",
          endTime: "2024-08-12T15:00:00",
          location: "〇〇キャンプ場",
          pdfUrl: "#",
          pdfTitle: "夏季キャンプ計画書.pdf",
        },
      ],
    },
    {
      id: "2",
      title: "2024年10月定例会議",
      category: "議事録",
      subCategory: undefined,
      status: "completed" as const,
      count: 1,
      latestActivity: {
        id: "2",
        title: "2024年10月定例会議",
        category: "議事録",
        subCategory: undefined,
        status: "completed" as const,
        description: "10月の定例会議を実施しました。今後の活動計画について話し合いました。",
        startTime: "2024-10-15T19:00:00",
        endTime: "2024-10-15T21:00:00",
        location: "集会所",
        pdfUrl: "#",
        pdfTitle: "10月定例会議事録.pdf",
      },
      activities: [
        {
          id: "2",
          title: "2024年10月定例会議",
          category: "議事録",
          subCategory: undefined,
          status: "completed" as const,
          description: "10月の定例会議を実施しました。今後の活動計画について話し合いました。",
          startTime: "2024-10-15T19:00:00",
          endTime: "2024-10-15T21:00:00",
          location: "集会所",
          pdfUrl: "#",
          pdfTitle: "10月定例会議事録.pdf",
        },
      ],
    },
    {
      id: "3",
      title: "ハイキング",
      category: "野外活動",
      subCategory: "ハイキング",
      status: "scheduled" as const,
      count: 1,
      latestActivity: {
        id: "3",
        title: "ハイキング",
        category: "野外活動",
        subCategory: "ハイキング",
        status: "scheduled" as const,
        description: "秋のハイキングを予定しています。紅葉を楽しみながら山道を歩きます。",
        startTime: "2024-11-20T09:00:00",
        endTime: "2024-11-20T16:00:00",
        location: "〇〇山",
        pdfUrl: "#",
        pdfTitle: "ハイキング計画書.pdf",
      },
      activities: [
        {
          id: "3",
          title: "ハイキング",
          category: "野外活動",
          subCategory: "ハイキング",
          status: "scheduled" as const,
          description: "秋のハイキングを予定しています。紅葉を楽しみながら山道を歩きます。",
          startTime: "2024-11-20T09:00:00",
          endTime: "2024-11-20T16:00:00",
          location: "〇〇山",
          pdfUrl: "#",
          pdfTitle: "ハイキング計画書.pdf",
        },
      ],
    },
    {
      id: "4",
      title: "2024年11月定例会議",
      category: "議事録",
      subCategory: undefined,
      status: "completed" as const,
      count: 1,
      latestActivity: {
        id: "4",
        title: "2024年11月定例会議",
        category: "議事録",
        subCategory: undefined,
        status: "completed" as const,
        description: "11月の定例会議を実施しました。",
        startTime: "2024-11-15T19:00:00",
        endTime: "2024-11-15T21:00:00",
        location: "集会所",
        pdfUrl: "#",
        pdfTitle: "11月定例会議事録.pdf",
      },
      activities: [
        {
          id: "4",
          title: "2024年11月定例会議",
          category: "議事録",
          subCategory: undefined,
          status: "completed" as const,
          description: "11月の定例会議を実施しました。",
          startTime: "2024-11-15T19:00:00",
          endTime: "2024-11-15T21:00:00",
          location: "集会所",
          pdfUrl: "#",
          pdfTitle: "11月定例会議事録.pdf",
        },
      ],
    },
  ]

  return excludeMinutes
    ? allActivities.filter((a) => a.category !== "議事録")
    : allActivities.filter((a) => a.category === "議事録")
}
