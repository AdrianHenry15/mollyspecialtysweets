import { useGlobalStore } from "../../stores/GlobalStore"
import React from "react"

const CakeReviewForm = () => {
  const {
    cakeShape,
    cakeTier,
    cakeSize,
    cakeFlavorInput,
    cakeFrostingInput,
    cakeFillingInput,
    cakeFruitFilling,
    cakeFruitFillingInput,
    cakeFruitTopping,
    cakeFruitToppingInput,
    setCakeFormSubmit,
  } = useGlobalStore().cakeStore!

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault
    setCakeFormSubmit!(false)
  }
  return (
    <form id="review-form">
      <h3>Cake Review Form</h3>
      {/* SHAPE */}
      <div className="review-item">
        <h2>Cake Shape: </h2>
        <i>{cakeShape!.label}</i>
      </div>
      {/* TIERS */}
      <div className="review-item">
        <h2>Cake Tiers: </h2>
        <i>{cakeTier!.label}</i>
      </div>
      {/* SIZE */}
      <div className="review-item">
        <h2>Cake Size: </h2>
        <i>{cakeSize!.label}</i>
      </div>
      {/* FLAVOR */}
      <div className="review-item">
        <h2>Cake Flavor: </h2>
        <i>{cakeFlavorInput!}</i>
      </div>
      {/* FROSTING */}
      <div className="review-item">
        <h2>Cake Frosting: </h2>
        <i>{cakeFrostingInput!}</i>
      </div>
      {/* FILLING */}
      <div className="review-item">
        <h2>Cake Filling: </h2>
        <i>{cakeFillingInput!}</i>
      </div>
      {/* FRUIT FILLING */}
      <div className="review-item">
        <h2> Cake Fruit Filling: </h2>
        <i>{`${
          cakeFruitFilling?.value === "other" ? "" : cakeFruitFilling!.label
        } ${cakeFruitFillingInput}`}</i>
      </div>
      {/* FRUIT TOPPING */}
      <div className="review-item">
        <h2> Cake Fruit Topping: </h2>
        <i>{`${
          cakeFruitTopping?.value === "other" ? "" : cakeFruitTopping!.label
        } ${cakeFruitToppingInput}`}</i>
      </div>
      <button
        className="review-form-submit"
        type="submit"
        onClick={(e) => handleSubmit(e)}>
        Edit Cake <br /> Form
      </button>
    </form>
  )
}

export default CakeReviewForm
