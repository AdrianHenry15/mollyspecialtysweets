/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getAllFaqs } from "@/sanity/lib/faqs/getAllFaqs"
import { Metadata } from "next"
import Image from "next/image"
import React from "react"
import Logo from "@/public/mollys-logo-black.png"
import { getAllFaqCategories } from "@/sanity/lib/faqs/getAllFaqCategories"
import FaqsCategorySelectorComponent from "@/components/layout/faqs/faq-category-selector"

export const metadata: Metadata = {
  title: "Molly Specialty Sweets FAQs",
  description: "FAQs",
}

// Utility to group FAQs by categories
function groupFaqsByCategory(faqs: any[]) {
  return faqs.reduce((acc: Record<string, any[]>, faq) => {
    faq.categories?.forEach((category: any) => {
      if (!acc[category.title]) {
        acc[category.title] = []
      }
      acc[category.title].push(faq)
    })
    return acc
  }, {})
}

export default async function FAQsPage() {
  const categories = await getAllFaqCategories()
  const faqs = await getAllFaqs()

  // Group FAQs by categories
  const groupedFaqs = groupFaqsByCategory(faqs)

  return (
    <section className="flex flex-col w-full bg-gray-200 relative">
      <div className="flex relative w-full justify-center items-center py-12 px-6 text-white bg-pink-300">
        <Image
          src={Logo}
          alt="logo"
          className="flex self-center justify-center text-center items-center w-48 my-10"
        />
      </div>
      <h5 className="mx-10 pt-8 text-6xl text-center md:text-start">FAQs</h5>

      {/* Categories Selector */}
      {/* <div className="w-full sm:w-[200px] my-4">
        <FaqsCategorySelectorComponent faqCategories={categories} />
      </div> */}

      {/* Render FAQs by Category */}
      <div className="w-full">
        {Object.keys(groupedFaqs).map((category) => (
          <div
            id={category}
            key={category}
            className="flex flex-col w-full bg-white my-10">
            <h3 className="text-pink-500 font-bold text-2xl my-6 px-6">
              {category}
            </h3>
            {groupedFaqs[category].map((faq, index) => (
              <div
                key={index}
                className="flex flex-col w-full self-center sm:w-1/2 px-6 py-4">
                <h5 className="text-zinc-500 font-bold text-xl my-4">
                  {faq.question}
                </h5>
                <p className="text-gray-400 text font-semibold">{faq.answer}</p>
                <hr className="my-6" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
