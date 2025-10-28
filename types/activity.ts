export type ActivityStatus = "scheduled" | "progress" | "completed"

export interface GASActivity {
  title: string
  description?: string
  startTime: string
  endTime: string
  location?: string
  category: string
  subCategory?: string
  sourcePdf?: {
    id: string
    title: string
    link: string
  }
}

export interface Activity {
  id: string
  title: string
  category: string
  subCategory?: string
  status: ActivityStatus
  description?: string
  startTime: string
  endTime: string
  location?: string
  pdfUrl?: string
  pdfTitle?: string
}

export interface GroupedActivity {
  id: string
  title: string
  category: string
  subCategory?: string
  status: ActivityStatus
  count: number
  latestActivity: Activity
  activities: Activity[]
}
