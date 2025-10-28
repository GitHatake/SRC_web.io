import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"

export default function Header() {
  const navItems = [
    { label: "活動記録", href: "#activities" },
    { label: "議事録", href: "#minutes" },
    { label: "スケジュール", href: "#calendar" },
    { label: "最新情報", href: "#social" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#009bde] via-[#00acc4] to-[#77c49f] border-b border-white/20 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* ロゴとタイトル */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden">
              <Image
                src="/SRC_SNS4.png"
                alt="ボーイスカウトロゴ"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white leading-tight">静岡ローバース会議</h1>
              <p className="text-xs text-white/90">活動ポータル</p>
            </div>
          </div>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-white hover:text-[var(--color-scout-yellow)] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* モバイルメニュー */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Menu className="h-5 w-5" />
                <span className="sr-only">メニューを開く</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium text-neutral-700 hover:text-[var(--color-scout-green)] transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
