import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import ActivityRecords from "@/components/activity-records"
import CalendarSection from "@/components/calendar-section"
import SocialSection from "@/components/social-section"
import { AdminButton } from "@/components/admin-button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#77c49f]/10 via-white to-[#009bde]/10">
      <Header />

      <HeroSection />

      <main className="container mx-auto px-4 py-8 space-y-16">
        <section id="activities" className="scroll-mt-20 bg-white rounded-xl p-8 shadow-lg border-t-4 border-[#009bde]">
          <h2 className="text-3xl font-bold mb-8 text-[#009bde]">活動記録</h2>
          <ActivityRecords excludeMinutes={true} />
        </section>

        <section id="minutes" className="scroll-mt-20 bg-white rounded-xl p-8 shadow-lg border-t-4 border-[#00acc4]">
          <h2 className="text-3xl font-bold mb-8 text-[#00acc4]">議事録</h2>
          <ActivityRecords excludeMinutes={false} />
        </section>

        <section id="calendar" className="scroll-mt-20 bg-white rounded-xl p-8 shadow-lg border-t-4 border-[#77c49f]">
          <h2 className="text-3xl font-bold mb-8 text-[#77c49f]">活動スケジュール</h2>
          <CalendarSection />
        </section>

        <section id="social" className="scroll-mt-20 bg-white rounded-xl p-8 shadow-lg border-t-4 border-[#009bde]">
          <h2 className="text-3xl font-bold mb-8 text-[#009bde]">最新情報</h2>
          <SocialSection />
        </section>
        <AdminButton /> 
      </main>
      
      <footer className="bg-gradient-to-r from-[#009bde] via-[#00acc4] to-[#77c49f] text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© 2025 shizuoka rovers conference. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
