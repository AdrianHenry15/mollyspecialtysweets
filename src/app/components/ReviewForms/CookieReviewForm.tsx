import { useGlobalStore } from "../../stores/GlobalStore"
import React from "react"

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
    <form id="review-form">
      <h3>Cookie Review Form</h3>
      {/* SIZE */}
      <div className="review-item">
        <h2>Cookie Size: </h2>
        <i>{cookieSize!.label}</i>
      </div>
      {/* AMOUNT */}
      <div className="review-item">
        <h2>Cookie Amount: </h2>
        <i>{cookieAmount!.label}</i>
      </div>
      {/* FLAVOR */}
      <div className="review-item">
        <h2>Cookie Flavor: </h2>
        <i>{cookieFlavorInput!}</i>
      </div>
      {/* FROSTING */}
      <div className="review-item">
        <h2>Cookie Frosting: </h2>
        <i>{cookieFrostingInput!}</i>
      </div>
      {/* FILLING */}
      <div className="review-item">
        <h2>Cookie Filling: </h2>
        <i>{cookieFillingInput!}</i>
      </div>
      {/* FRUIT FILLING */}
      <div className="review-item">
        <h2> Cookie Fruit: </h2>
        <i>{`${
          cookieFruitFilling?.value === "other" ? "" : cookieFruitFilling!.label
        } ${cookieFruitFillingInput}`}</i>
      </div>
      {/* FRUIT TOPPING */}
      <div className="review-item">
        <h2> Cookie Fruit: </h2>
        <i>{`${
          cookieFruitTopping?.value === "other" ? "" : cookieFruitTopping!.label
        } ${cookieFruitToppingInput}`}</i>
      </div>
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
