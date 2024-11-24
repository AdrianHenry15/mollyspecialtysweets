import { Faq, FaqCategory } from "@/sanity.types"
import React from "react"
import FaqsGrid from "./faqs-grid"
import FaqCategorySelectorComponent from "./faq-category-selector"

interface FaqsViewProps {
  faqs: Faq[]
  faqCategories: FaqCategory[]
}

const FaqsView = ({ faqs, faqCategories }: FaqsViewProps) => {
  return (
    <div>
      {/* Categories */}
      <div className="w-full sm:w-[200px]">
        <FaqCategorySelectorComponent faqCategories={faqCategories} />
      </div>
      {/* Products */}
      <div className="flex-1">
        <div>
          <FaqsGrid faqs={faqs} />

          {/* Horizontal Line Tag  */}
          <hr className="w-1.2 sm:w-3/4" />
        </div>
      </div>
    </div>
  )
}

export default FaqsView
