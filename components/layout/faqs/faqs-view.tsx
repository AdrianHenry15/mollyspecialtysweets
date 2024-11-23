import { Category, Product } from "@/sanity.types"
import React from "react"
import FaqsGrid from "./faqs-grid"
import FaqCategorySelectorComponent from "./faq-category-selector"

interface ProductsViewProps {
  faqs: Product[]
  categories: Category[]
}

const FaqsView = ({ faqs, categories }: ProductsViewProps) => {
  return (
    <div>
      {/* Categories */}
      <div className="w-full sm:w-[200px]">
        <FaqCategorySelectorComponent categories={categories} />
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
