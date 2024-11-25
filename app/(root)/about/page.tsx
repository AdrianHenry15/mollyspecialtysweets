import CakeSplash from "@/public/marble-cupcakes.jpg"
import Splash from "@/components/splash"
import AboutSection from "@/components/layout/about/about-section"

export default function AboutPage() {
  return (
    <div className="flex flex-col justify-between w-full">
      <Splash
        link1="/contact"
        btn1="Contact Us"
        link2="/online-consultation"
        btn2="Online Consultation"
        img={CakeSplash}
        title="About Molly"
      />
      <AboutSection />
    </div>
  )
}
