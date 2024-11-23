import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const getFaqsByCategory = async (categorySlug: string) => {
  const FAQS_BY_CATEGORY_QUERY =
    defineQuery(`*[_type == "faq" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc)
`)

  try {
    // Use sanityFetch to send the query and pass the category slug
    const faqs = await sanityFetch({
      query: FAQS_BY_CATEGORY_QUERY,
      params: {
        categorySlug,
      },
    })

    // Return the list of products, or an empty array if none are found
    return faqs.data || []
  } catch (error) {
    console.error("Error fetching faqs by category:", error)
    return []
  }
}
