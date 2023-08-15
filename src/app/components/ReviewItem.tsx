import React from "react"

interface ReviewItemProps {
  label: string
  value: string
  isFruitField?: boolean
  fruitValue?: string
  fruitLabel?: string
}

const ReviewItem = (props: ReviewItemProps) => {
  const { label, value, isFruitField, fruitValue, fruitLabel } = props
  return (
    <div className="review-item">
      <h2>{label}: </h2>
      <i>
        {isFruitField && fruitValue !== "other" && fruitLabel
          ? `${fruitLabel} `
          : ""}
        {value}
      </i>
    </div>
  )
}

export default ReviewItem
