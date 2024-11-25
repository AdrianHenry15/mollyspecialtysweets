/* eslint-disable @typescript-eslint/no-unused-vars */
import { getAllFaqs } from "@/sanity/lib/faqs/getAllFaqs"
import { Metadata } from "next"
import Image from "next/image"
import React from "react"
import Logo from "@/public/mollys-logo-black.png"
import FaqsCategorySelectorComponent from "@/components/layout/faqs/faq-category-selector"
import { getAllFaqCategories } from "@/sanity/lib/faqs/getAllFaqCategories"

// TODO: Use Temu FAQs for layout reference
export const metadata: Metadata = {
  title: "Molly Specialty Sweets FAQs",
  description: "FAQs",
}

export default async function FAQsPage() {
  const categories = await getAllFaqCategories()
  const faqs = await getAllFaqs()

  return (
    <section className="flex flex-col w-full bg-gray-200 relative">
      <Image src={Logo} alt="logo" className="flex self-center w-48 my-10" />
      {/* Categories */}
      <div className="w-full sm:w-[200px] my-4">
        <FaqsCategorySelectorComponent faqCategories={categories} />
      </div>

      <div>
        {/* <h5>Cakes</h5> */}
        {faqs.map((item, index) => {
          return (
            <div key={index} className="flex flex-col w-full bg-white">
              <div className="flex flex-col w-full bg-white self-center sm:w-1/2">
                <h5 className="text-zinc-700 font-semibold">{item.question}</h5>
                <p className="text-gray-800 text-sm">{item.answer}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
