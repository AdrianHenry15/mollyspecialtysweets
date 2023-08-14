import React from "react"
import { useGlobalStore } from "../../stores/GlobalStore"

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
  } = useGlobalStore().cupcakeStore!

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault
    setCupcakeFormSubmit!(false)
  }
  return (
    <form id="review-form">
      <h3>Cupcake Review Form</h3>
      {/* SIZE */}
      <div className="review-item">
        <h2>Cupcake Size: </h2>
        <i>{cupcakeSize!.label}</i>
      </div>
      {/* AMOUNT */}
      <div className="review-item">
        <h2>Cupcake Amount: </h2>
        <i>{cupcakeAmount!.label}</i>
      </div>
      {/* FLAVOR */}
      <div className="review-item">
        <h2>Cupcake Flavor: </h2>
        <i>{cupcakeFlavorInput!}</i>
      </div>
      {/* FROSTING */}
      <div className="review-item">
        <h2>Cupcake Frosting: </h2>
        <i>{cupcakeFrostingInput!}</i>
      </div>
      {/* FILLING */}
      <div className="review-item">
        <h2>Cupcake Filling: </h2>
        <i>{cupcakeFillingInput!}</i>
      </div>
      {/* FRUIT FILLING */}
      <div className="review-item">
        <h2> Cupcake Fruit: </h2>
        <i>{`${
          cupcakeFruitFilling?.value === "other"
            ? ""
            : cupcakeFruitFilling!.label
        } ${cupcakeFruitFillingInput}`}</i>
      </div>
      {/* FRUIT TOPPING */}
      <div className="review-item">
        <h2> Cupcake Fruit: </h2>
        <i>{`${
          cupcakeFruitTopping?.value === "other"
            ? ""
            : cupcakeFruitTopping!.label
        } ${cupcakeFruitToppingInput}`}</i>
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

export default CupcakeReviewForm
