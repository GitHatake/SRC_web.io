import { Calendar, MapPin, FileText } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Activity } from "@/types/activity"

interface ActivityDetailDialogProps {
  activity: Activity | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ActivityDetailDialog({ activity, open, onOpenChange }: ActivityDetailDialogProps) {
  if (!activity) return null

  const statusConfig = {
    scheduled: {
      label: "予定",
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

  const status = statusConfig[activity.status]

  function formatDateTime(startTime: string, endTime: string): string {
    const start = new Date(startTime)
    const end = new Date(endTime)

    const startDate = start.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
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
      weekday: "short",
    })
    return `${startDate} ${startTimeStr}〜${endDate} ${endTimeStr}`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <DialogTitle className="text-2xl text-balance leading-tight">{activity.title}</DialogTitle>
            <Badge className={status.className}>{status.label}</Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* カテゴリ情報 */}
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-neutral-700">カテゴリ:</span>
            <span className="text-neutral-600">{activity.category}</span>
            {activity.subCategory && (
              <>
                <span className="text-neutral-400">•</span>
                <span className="text-neutral-600">{activity.subCategory}</span>
              </>
            )}
          </div>

          {activity.description && (
            <div>
              <h3 className="font-medium text-neutral-700 mb-2">概要</h3>
              <p className="text-neutral-600 leading-relaxed text-pretty">{activity.description}</p>
            </div>
          )}

          {activity.startTime && activity.endTime && (
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[var(--color-scout-green)] mt-0.5" />
              <div>
                <h3 className="font-medium text-neutral-700 mb-1">日時</h3>
                <p className="text-neutral-600">{formatDateTime(activity.startTime, activity.endTime)}</p>
              </div>
            </div>
          )}

          {/* 場所 */}
          {activity.location && (
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[var(--color-scout-green)] mt-0.5" />
              <div>
                <h3 className="font-medium text-neutral-700 mb-1">場所</h3>
                <p className="text-neutral-600">{activity.location}</p>
              </div>
            </div>
          )}

          {activity.pdfUrl && (
            <div className="pt-4 border-t">
              <Button asChild className="w-full bg-[var(--color-scout-green)] hover:bg-[var(--color-scout-green)]/90">
                <a href={activity.pdfUrl} target="_blank" rel="noopener noreferrer">
                  <FileText className="w-4 h-4 mr-2" />
                  {activity.pdfTitle || "詳細PDFを開く"}
                </a>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
