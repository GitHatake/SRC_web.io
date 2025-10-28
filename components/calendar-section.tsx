"use client"

export default function CalendarSection() {
  const calendarEmbedUrl =
    "https://calendar.google.com/calendar/embed?src=c_e8a9b5f40512febd578c14ee11a1b1ded5e797d09e79505da1e693aec51fefd9%40group.calendar.google.com&ctz=Asia%2FTokyo&hl=ja"

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-neutral-200">
        <div className="aspect-[16/10] w-full">
          <iframe src={calendarEmbedUrl} className="w-full h-full border-0" title="活動スケジュールカレンダー" />
        </div>
      </div>
    </div>
  )
}
