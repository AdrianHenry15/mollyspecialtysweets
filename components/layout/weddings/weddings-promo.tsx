import Image from "next/image"
import React from "react"
import WeddingImg from "@/public/chcolate-cake.jpg"

const WeddingsPromo = () => {
  return (
    <section className="bg-gradient-to-r from-emerald-700 to-emerald-500 py-12 sm:py-16 lg:py-24 px-6 sm:px-12 lg:px-16 my-8 mx-4 sm:mx-6 lg:mx-12 text-white rounded-lg">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Make Your Wedding Day Special
          </h2>
          <p className="mt-4 text-lg sm:text-xl">
            Experience unforgettable moments and celebrate your love with our
            exclusive wedding packages. Let us handle the details so you can
            focus on what truly matters.
          </p>
          <div className="mt-6">
            <a
              href="#contact"
              className="inline-block bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-zinc-800 hover:text-white transition duration-300">
              Get in Touch
            </a>
          </div>
        </div>

        <div className="relative h-64 sm:h-80 lg:h-full">
          <Image
            src={WeddingImg}
            alt="Weddings Promotion"
            className="object-cover w-full h-full rounded-lg shadow-xl"
          />
        </div>
      </div>
    </section>
  )
}

export default WeddingsPromo
