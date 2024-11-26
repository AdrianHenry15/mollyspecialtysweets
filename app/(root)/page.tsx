import CakeSplash from "@/public/cake-splash.jpg"
import IconsRow from "@/components/layout/icons-row"

import WeddingIcon from "@/public/icons/arch.png"
import BakeryIcon from "@/public/icons/bakery.png"
import FAQIcon from "@/public/icons/faq.png"
import Splash from "@/components/splash"
import ConsultationForm from "@/components/form-components/forms/consultation-form"

export default function HomePage() {
  return (
    <div className="flex flex-col justify-between w-full">
      {/* JUMBOTRON */}
      <Splash
        link1="/contact"
        btn1="Contact Us"
        link2="/online-consultation"
        btn2="Online Consulation"
        img={CakeSplash}
        title="Molly's Specialty Sweets"
      />
      {/* ICON BANNER */}
      <IconsRow
        iconItem1={{
          linkText: "Store",
          href: "/store",
          src: BakeryIcon,
          name: "Store",
          description:
            "Handcrafted treats, custom cakes, and fresh bakes delivered to your door. 🍪🎂 Sweetness made simple!",
        }}
        iconItem2={{
          linkText: "Weddings",
          href: "/weddings",
          src: WeddingIcon,
          name: "Weddings",
          description:
            "Elegant wedding cakes and treats, handcrafted to make your day unforgettable. 💍🎂",
        }}
        iconItem3={{
          linkText: "FAQs",
          href: "/faqs",
          src: FAQIcon,
          name: "FAQs",
          description:
            "Have questions? Our FAQ section has all the answers you need about orders, delivery, and customization!",
        }}
      />
      <ConsultationForm />
    </div>
  )
}
