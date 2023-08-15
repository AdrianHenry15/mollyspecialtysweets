import { useGlobalStore } from "../../stores/GlobalStore"
import React from "react"
import ReviewItem from "../ReviewItem"

const CookieReviewForm = () => {
  const {
    cookieSize,
    cookieAmount,
    cookieFlavorInput,
    cookieFrostingInput,
    cookieFillingInput,
    cookieFruitFilling,
    cookieFruitTopping,
    cookieFruitFillingInput,
    cookieFruitToppingInput,
    setCookieFormSubmit,
  } = useGlobalStore().cookieStore!

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault
    setCookieFormSubmit!(false)
  }
  return (
    <form className="review-form">
      <h3>Cookie Review Form</h3>
      <ReviewItem label="Cookie Size" value={cookieSize!.label} />
      <ReviewItem label="Cookie Amount" value={cookieAmount!.label} />
      <ReviewItem label="Cookie Flavor" value={cookieFlavorInput!} />
      <ReviewItem label="Cookie Frosting" value={cookieFrostingInput!} />
      <ReviewItem label="Cookie Filling" value={cookieFillingInput!} />
      <ReviewItem
        label="Cookie Fruit"
        value={
          cookieFruitFilling?.value === "other"
            ? ""
            : cookieFruitFilling!.label + " " + cookieFruitFillingInput
        }
      />
      <ReviewItem
        label="Cookie Fruit"
        value={
          cookieFruitTopping?.value === "other"
            ? ""
            : cookieFruitTopping!.label + " " + cookieFruitToppingInput
        }
      />
      <button
        className="review-form-submit"
        type="submit"
        onClick={(e) => handleSubmit(e)}>
        Edit Cookies <br /> Form
      </button>
    </form>
  )
}

export default CookieReviewForm
