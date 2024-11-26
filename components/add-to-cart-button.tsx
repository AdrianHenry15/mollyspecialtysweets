"use client"

import { Product } from "@/sanity.types"
import useCartStore from "@/stores/cart-store"
import React, { useEffect, useState } from "react"

interface AddToCartButtonProps {
  product: Product
  disabled?: boolean
}

const AddToCartButton = (props: AddToCartButtonProps) => {
  const { product, disabled } = props
  const { addItem, removeItem, getItemCount } = useCartStore()
  const itemCount = getItemCount(product._id)
  const [isClient, setIsClient] = useState(false)

  // Use useEffect to set isClient to true after component mounts
  // This ensures that the component only renders on the client-side,
  // ...preventing hydration errors due to server/client mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => removeItem(product._id)}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 
          ${itemCount === 0 ? "bg-gray-100 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"}`}
        disabled={itemCount === 0 || disabled}>
        <span
          className={`text-xl font-bold ${itemCount === 0 ? "text-gray-400" : "text-gray-600"}`}>
          -
        </span>
      </button>
      <span className="w-8 text-center font-semibold">{itemCount}</span>
      <button
        onClick={() => addItem(product)}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 
          ${itemCount > 1 ? "bg-gray-400 cursor-not-allowed pointer-events-none" : "bg-black hover:bg-zinc-800"}`}
        disabled={itemCount > 1 ? disabled : disabled}>
        <span className={`text-xl font-bold text-white`}>+</span>
      </button>
    </div>
  )
}

export default AddToCartButton
