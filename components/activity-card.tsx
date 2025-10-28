"use client"

import type React from "react"

import { Calendar, MapPin, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { GroupedActivity } from "@/types/activity"

interface ActivityCardProps {
  activity: GroupedActivity
  onClick: () => void
}

export default function ActivityCard({ activity, onClick }: ActivityCardProps) {
  const statusConfig = {
    scheduled: {
      label: "実施予定",
      className: "bg-[var(--color-status-scheduled)] text-white",
    },
    progress: {
      label: "進行中",
      className: "bg-[var(--color-status-progress)] text-white",
    },
    completed: {
      label: "完了",
      className: "bg-[var(--color-status-completed)] text-white",
    },
  }

  const status = statusConfig[activity.status as keyof typeof statusConfig] || {
    label: activity.status || "不明",
    className: "bg-neutral-500 text-white",
  }

  function formatDateTime(startTime: string, endTime: string): string {
    const start = new Date(startTime)
    const end = new Date(endTime)

    const startDate = start.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    const startTimeStr = start.toLocaleTimeString("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
    })
    const endTimeStr = end.toLocaleTimeString("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
    })

    // 同じ日の場合
    if (start.toDateString() === end.toDateString()) {
      return `${startDate} ${startTimeStr}〜${endTimeStr}`
    }

    // 異なる日の場合
    const endDate = end.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    return `${startDate}〜${endDate}`
  }

  const handlePdfClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation()
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border-2 hover:border-[var(--color-scout-green)]">
      <div onClick={onClick}>
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg leading-tight text-balance">{activity.title}</CardTitle>
            <Badge className={`${status.className} text-sm px-3 py-1 shrink-0`}>{status.label}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <span className="font-medium">{activity.category}</span>
            {activity.subCategory && (
              <>
                <span>•</span>
                <span>{activity.subCategory}</span>
              </>
            )}
          </div>
          {activity.count > 1 && <div className="text-xs text-neutral-500">{activity.count}件の記録</div>}
          {activity.latestActivity.startTime && activity.latestActivity.endTime && (
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Calendar className="w-4 h-4" />
              <span>{formatDateTime(activity.latestActivity.startTime, activity.latestActivity.endTime)}</span>
            </div>
          )}
          {activity.latestActivity.location && (
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-1">{activity.latestActivity.location}</span>
            </div>
          )}
        </CardContent>
      </div>
      {activity.activities.some((a) => a.pdfUrl) && (
        <div className="px-6 pb-4 space-y-2">
          {activity.activities
            .filter((a) => a.pdfUrl)
            .map((act, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full border-[var(--color-scout-green)] text-[var(--color-scout-green)] hover:bg-[var(--color-scout-green)] hover:text-white bg-transparent"
                onClick={(e) => handlePdfClick(e, act.pdfUrl!)}
              >
                <FileText className="w-4 h-4 mr-2" />
                {act.pdfTitle || "詳細PDFを開く"}
              </Button>
            ))}
        </div>
      )}
    </Card>
  )
}
