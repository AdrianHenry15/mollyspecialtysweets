import React from "react"
import { useGlobalStore } from "../../stores/GlobalStore"
import ReviewItem from "../ReviewItem"

const CupcakeReviewForm = () => {
  const {
    cupcakeSize,
    cupcakeAmount,
    cupcakeFlavorInput,
    cupcakeFrostingInput,
    cupcakeFillingInput,
    cupcakeFruitFilling,
    cupcakeFruitTopping,
    cupcakeFruitFillingInput,
    cupcakeFruitToppingInput,
    setCupcakeFormSubmit,
  } = useGlobalStore().cupcakeStore

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault
    setCupcakeFormSubmit(false)
  }
  return (
    <form className="review-form">
      <h3>Cupcake Review Form</h3>
      <ReviewItem label="Cupcake Size" value={cupcakeSize.label} />
      <ReviewItem label="Cupcake Amount" value={cupcakeAmount.label} />
      <ReviewItem label="Cupcake Flavor" value={cupcakeFlavorInput} />
      <ReviewItem label="Cupcake Frosting" value={cupcakeFrostingInput} />
      <ReviewItem label="Cupcake Filling" value={cupcakeFillingInput} />
      <ReviewItem
        label="Cupcake Fruit"
        value={
          cupcakeFruitFilling.value === "other"
            ? ""
            : cupcakeFruitFilling.label + " " + cupcakeFruitFillingInput
        }
      />
      <ReviewItem
        label="Cupcake Fruit"
        value={
          cupcakeFruitTopping.value === "other"
            ? ""
            : cupcakeFruitTopping.label + " " + cupcakeFruitToppingInput
        }
      />
      <button
        className="review-form-submit"
        type="submit"
        onClick={(e) => handleSubmit(e)}>
        Edit Cupcakes <br /> Form
      </button>
    </form>
  )
}

export default CupcakeReviewForm
