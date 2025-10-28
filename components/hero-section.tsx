export default function HeroSection() {
  return (
    <section className="relative h-[500px] w-full overflow-hidden">
      {/* 背景画像 */}
      <div className="absolute inset-0">
        <img src="/backgroundimage.jpg" alt="ボーイスカウト活動" className="w-full h-full object-cover" />
        {/* グラデーションオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#009bde]/80 via-[#00acc4]/70 to-[#77c49f]/80" />
      </div>

      {/* コンテンツ */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">静岡ローバース会議</h1>
        <p className="text-xl md:text-2xl mb-4 max-w-3xl drop-shadow-md">Shizuoka Rovers Conference</p>
        <p className="text-lg md:text-xl max-w-2xl leading-relaxed drop-shadow-md">
          静岡県内のローバースカウトが集まり、活動を共創し、 地域社会への貢献を通して成長すること目指しています。
          このサイトでは、私たちの活動記録やスケジュール、最新情報を確認できます。
        </p>
      </div>
    </section>
  )
}
