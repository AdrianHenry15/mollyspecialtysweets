import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Brite FAQs",
  description: "FAQs",
}

export default async function FAQsPage() {
  // const faqs: Faq[] = await getAllFaqs()
  return (
    <section className="flex flex-col w-full bg-white relative">
      {/* TITLE */}
      <h5 className="text-[60px] text-white tracking-wider pl-6 bg-pink-500 py-4 md:py-24">
        FAQs
      </h5>
    </section>
  )
}
