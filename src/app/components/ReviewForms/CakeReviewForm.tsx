import { useGlobalStore } from "../../stores/GlobalStore"
import React from "react"
import ReviewItem from "../ReviewItem"

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
  } = useGlobalStore().cakeStore

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault
    setCakeFormSubmit(false)
  }
  return (
    <form className="review-form">
      <h3>Cake Review Form</h3>

      <ReviewItem label="Cake Shape" value={cakeShape.label} />
      <ReviewItem label="Cake Tiers" value={cakeTier.label} />
      <ReviewItem label="Cake Size" value={cakeSize.label} />
      <ReviewItem label="Cake Flavor" value={cakeFlavorInput} />
      <ReviewItem label="Cake Frosting" value={cakeFrostingInput} />
      <ReviewItem label="Cake Filling" value={cakeFillingInput} />

      <ReviewItem
        label="Cake Fruit Filling"
        value={cakeFruitFillingInput}
        isFruitField
        fruitValue={cakeFruitFilling.value}
        fruitLabel={cakeFruitFilling.label}
      />

      <ReviewItem
        label="Cake Fruit Topping"
        value={cakeFruitToppingInput}
        isFruitField
        fruitValue={cakeFruitTopping.value}
        fruitLabel={cakeFruitTopping.label}
      />
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
