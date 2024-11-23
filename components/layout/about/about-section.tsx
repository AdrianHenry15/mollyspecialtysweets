import Image from "next/image"
import React from "react"
import Img from "@/public/carrot-cupcakes.jpg"

const AboutSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-pink-100 to-white py-16 lg:py-24 px-6 sm:px-12">
      <h2 className="text-4xl sm:text-5xl mb-6 font-bold text-pink-600">
        {`Welcome to Molly's Specialty Sweets`}
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image Section */}
        <div className="relative">
          <Image
            src={Img} // Replace with the actual image path
            alt="Molly's Bakery"
            className="rounded-lg shadow-lg w-full object-cover"
          />
          <div className="absolute inset-0 bg-pink-50/30 rounded-lg"></div>
        </div>

        {/* Text Section */}
        <div className="flex flex-col space-y-6">
          <p className="text-gray-700 text-lg leading-relaxed">
            {`Nestled in the heart of [Your Location], Molly's Specialty Sweets is a private bakery 
            dedicated to crafting the finest custom cakes, cookies, and pastries for your 
            special moments. From weddings to birthdays, every creation is made with love, care, 
            and the finest ingredients.`}
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            {`Molly's journey started in a small kitchen with a big dream—to spread joy one 
            dessert at a time. Today, we bring your visions to life, creating treats as 
            beautiful as they are delicious.`}
          </p>
          <p className="text-pink-600 font-semibold italic">
            {`"Every dessert has a story, and we’re honored to be part of yours."`}
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
