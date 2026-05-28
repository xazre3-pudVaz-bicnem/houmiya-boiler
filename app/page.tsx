import Header from '@/components/Header'
import Hero from '@/components/Hero'
import BrandMessage from '@/components/BrandMessage'
import ReasonsSection from '@/components/ReasonsSection'
import ProductGuideSection from '@/components/ProductGuideSection'
import ProductListingSection from '@/components/ProductListingSection'
import CasesSection from '@/components/CasesSection'
import VoiceCarousel from '@/components/VoiceCarousel'
import AreaSection from '@/components/AreaSection'
import FAQSection from '@/components/FAQSection'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BrandMessage />
        <ReasonsSection />
        <ProductGuideSection />
        <ProductListingSection />
        <CasesSection />
        <VoiceCarousel />
        <AreaSection />
        <FAQSection />
        {/* スピード見積フォーム — FixedCTA の「見積もり」ボタンがスクロールする先 */}
        <section id="speed-estimate" className="scroll-mt-20">
          <ContactForm />
        </section>
      </main>
      <Footer />
      <FixedCTA />
    </>
  )
}
