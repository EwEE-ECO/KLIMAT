import { HeroSection } from "@/components/sections/HeroSection"
import { FeaturesSection } from "@/components/sections/FeaturesSection"
import { CategoriesSection } from "@/components/sections/CategoriesSection"
import { HitsSection } from "@/components/sections/HitsSection"
import { WhyUsSection } from "@/components/sections/WhyUsSection"
import { ReviewsSection } from "@/components/sections/ReviewsSection"
import { BlogSection } from "@/components/sections/BlogSection"
import { ContactSection } from "@/components/sections/ContactSection"
import { SectionWrapper } from "@/components/sections/SectionWrapper"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SectionWrapper><FeaturesSection /></SectionWrapper>
      <SectionWrapper><CategoriesSection /></SectionWrapper>
      <SectionWrapper><HitsSection /></SectionWrapper>
      <SectionWrapper><WhyUsSection /></SectionWrapper>
      <SectionWrapper><ReviewsSection /></SectionWrapper>
      <SectionWrapper><BlogSection /></SectionWrapper>
      <SectionWrapper><ContactSection /></SectionWrapper>
    </>
  )
}
