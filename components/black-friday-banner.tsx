import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode"
import React from "react"

async function BlackFridayBanner() {
  const sale = await getActiveSaleByCouponCode("BFRIDAY")

  if (!sale?.isActive) {
    return null
  }
  return (
    <div className="bg-gradient-to-r from-red-600 to-black text-white px-6 py-10 mx-4 mt-2 rounded-lg shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1">
          {/* Title */}
          <h2 className="text-3xl sm:text-5xl font-extrabold text-left mb-4">
            {sale.title}
          </h2>
          {/* Description */}
          <p className="text-left text-xl sm:text-3xl font-semibold mb-6">
            {" "}
            {sale.description}
          </p>
          {/* Coupon Code */}
          <div className="flex">
            <div className="bg-white text-black py-4 px-6 rounded-full shadow-md transform hover:scale-105 transition duration-300">
              <span className="font-bold text-base sm:text-xl">
                Use code:
                <span className="text-red-600">{sale.couponCode}</span>
              </span>
              <span className="ml-2 font-bold text-base sm:text-xl">
                for {sale.discountAmount}% OFF
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlackFridayBanner
