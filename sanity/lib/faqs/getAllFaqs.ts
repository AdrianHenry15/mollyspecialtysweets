import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const getAllFaqs = async () => {
  const ALL_FAQS_QUERY = defineQuery(`
    *[_type == "faq"] | order(question asc) {
      _id,
      question,
      answer,
      categories[]->{
        title
      }
    }
  `)

  try {
    // Use sanityFetch to send the query
    const faqs = await sanityFetch({
      query: ALL_FAQS_QUERY,
    })

    // Return the list of faqs, or an empty array if none are found
    return faqs.data || []
  } catch (error) {
    console.error("Error fetching all faqs:", error)
    return []
  }
}
