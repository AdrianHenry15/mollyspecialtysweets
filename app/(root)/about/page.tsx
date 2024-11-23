import CakeSplash from "@/public/marble-cupcakes.jpg"
import Splash from "@/components/splash"
import AboutSection from "@/components/layout/about/about-section"

export default function AboutPage() {
  return (
    <div className="flex flex-col justify-between w-full">
      <Splash
        link1="/contact-us"
        link_title_1="Contact Us"
        link2="/estimate"
        link_title_2="Estimate"
        img={CakeSplash}
        title="About Molly"
      />
      <AboutSection />
    </div>
  )
}
