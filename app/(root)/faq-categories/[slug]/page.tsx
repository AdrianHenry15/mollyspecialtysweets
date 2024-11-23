import FaqsView from "@/components/layout/faqs/faqs-view"
import { getFaqsByCategory } from "@/sanity/lib/faqs/getFaqsByCategory"
import { getAllCategories } from "@/sanity/lib/products/getAllCategories"

async function FaqsCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const faqs = await getFaqsByCategory(slug)
  const categories = await getAllCategories()
  return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {`${slug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")} FAQ Collection`}
        </h1>
        <FaqsView faqs={faqs} categories={categories} />
      </div>
    </div>
  )
}

export default FaqsCategoryPage
