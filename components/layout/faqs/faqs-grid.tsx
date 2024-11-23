"use client"

import { Product } from "@/sanity.types"
import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import FaqsThumb from "./faqs-thumb"

const FaqsGrid = ({ faqs }: { faqs: Product[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {faqs?.map((faq) => {
        return (
          <AnimatePresence key={faq._id}>
            <motion.div
              layout
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center">
              <FaqsThumb key={faq._id} product={faq} />
            </motion.div>
          </AnimatePresence>
        )
      })}
    </div>
  )
}

export default FaqsGrid
