import WeddingsSplash from "@/public/chcolate-cake.jpg"
import Splash from "@/components/splash"

import WeddingConsultationForm from "@/components/form-components/forms/wedding-consultation-form"

export default function WeddingsPage() {
  return (
    <div className="flex flex-col justify-between w-full">
      {/* JUMBOTRON */}
      <Splash
        link1="/store"
        btn1="Store"
        link2="/online-consultation"
        btn2="Online Consulation"
        img={WeddingsSplash}
        title="Weddings"
        btnClass1="bg-green-600 hover:bg-green-500 ease-in-out duration-300 transition-all border-none"
        btnClass2="bg-white/50 hover:bg-white/60 ease-in-out duration-300 transition-all border-none"
        containerHeight="md:h-[500px]"
      />
      <WeddingConsultationForm />
    </div>
  )
}
