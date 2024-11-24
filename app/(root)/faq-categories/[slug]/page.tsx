import FaqsView from "@/components/layout/faqs/faqs-view"
import { getAllFaqCategories } from "@/sanity/lib/faqs/getAllFaqCategories"
import { getFaqsByCategory } from "@/sanity/lib/faqs/getFaqsByCategory"

async function FaqsCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const faqs = await getFaqsByCategory(slug)
  const faqCategories = await getAllFaqCategories()
  return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {`${slug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")} FAQ Collection`}
        </h1>
        <FaqsView faqs={faqs} faqCategories={faqCategories} />
      </div>
    </div>
  )
}

export default FaqsCategoryPage
