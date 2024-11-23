import WeddingsPromo from "@/components/layout/weddings/weddings-promo"

export default function WeddingsPage() {
  return (
    <div>
      <h5 className="border-l-2 border-b-2  border-transparent  text-6xl m-4 px-2 py-24 w-full text-left lg:border-l-zinc-200 lg:border-b-black">
        Weddings
      </h5>

      {/* Promotion Section */}
      <WeddingsPromo />
    </div>
  )
}
