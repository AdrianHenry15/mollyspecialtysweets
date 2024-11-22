import CategorySelectorComponent from "@/components/ui/category-selector"
import { getAllFaqs } from "@/sanity/lib/faqs/getAllFaqs"
import { getAllCategories } from "@/sanity/lib/products/getAllCategories"
import { Metadata } from "next"
import Image from "next/image"
import React from "react"
import Logo from "@/public/mollys-logo-black.png"

export const metadata: Metadata = {
  title: "Molly Specialty Sweets FAQs",
  description: "FAQs",
}

export default async function FAQsPage() {
  const faqs = await getAllFaqs()
  const categories = await getAllCategories()
  return (
    <section className="flex flex-col w-full bg-gray-200 relative">
      {/* TITLE */}
      <h5 className="text-[60px] text-white tracking-wider pl-6 bg-pink-500 py-4 md:py-24">
        FAQs
      </h5>
      <Image src={Logo} alt="logo" className="flex self-center w-48 my-10" />
      {/* Categories */}
      <div className="w-full sm:w-[200px] my-4">
        <CategorySelectorComponent categories={categories} />
      </div>
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
    </section>
  )
}
