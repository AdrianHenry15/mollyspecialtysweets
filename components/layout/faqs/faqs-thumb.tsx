import { Faq } from "@/sanity.types"
import React from "react"

const FaqsThumb = ({ faq }: { faq: Faq }) => {
  return (
    <div>
      <h5>{faq.question}</h5>
      <h5>{faq.answer}</h5>
    </div>
  )
}

export default FaqsThumb
