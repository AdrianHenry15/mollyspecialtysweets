import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const getAllFaqCategories = async () => {
  const ALL_FAQ_CATEGORIES_QUERY =
    defineQuery(`*[_type == "faqCategory"] | order(name asc)
`)

  try {
    // Use sanityFetch to send the query
    const faqCategories = await sanityFetch({
      query: ALL_FAQ_CATEGORIES_QUERY,
    })

    // Return the list of products, or an empty array if none are found
    return faqCategories.data || []
  } catch (error) {
    console.error("Error fetching all faq categories:", error)
    return []
  }
}
