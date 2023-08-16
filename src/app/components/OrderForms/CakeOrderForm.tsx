"use client"
import React, { useState } from "react"
import Select from "react-select"

import { FruitOptions } from "@/app/costants/GlobalOptions"
import { GlobalStore } from "@/app/stores/GlobalStore"

const TierOptions = [
  { value: "single", label: "Single" },
  { value: "multiple", label: "Multiple" },
]

const CakeShapeOptions = [
  { value: "round", label: "Round" },
  { value: "sheet", label: "Sheet" },
]

const CakeSizeOptions = [
  { value: "6 inch", label: "6 inch (18 Servings)" },
  { value: "8 inch", label: "8 inch (32 Servings)" },
  { value: "10 inch", label: "10 inch (50 Servings)" },
  { value: "12 inch", label: "12 inch (72 Servings)" },
  { value: "14 inch", label: "14 inch (98 Servings)" },
  { value: "16 inch", label: "16 inch (128 Servings)" },
]

const CakeOrderForm = () => {
  const {
    cakeShape,
    cakeTier,
    cakeSize,
    cakeFlavorInput,
    cakeFrostingInput,
    cakeFillingInput,
    cakeFruitFilling,
    cakeFruitTopping,
    cakeFruitFillingInput,
    cakeFruitToppingInput,
    cakeShapeError,
  } = GlobalStore().cakeStore!
  // Handlers
  const {
    handleCakeFlavorInput,
    handleCakeFrostingInput,
    handleCakeFillingInput,
    handleCakeFruitFillingInput,
    handleCakeFruitToppingInput,
  } = GlobalStore().cakeStore.handlers
  // Setters
  const {
    setCakeShape,
    setCakeTier,
    setCakeSize,
    setCakeFruitFilling,
    setCakeFruitTopping,
    submitCakeForm,
  } = GlobalStore().cakeStore.setters

  //Order Type
  const { orderType } = GlobalStore().orderTypeStore

  const [isCakeFormValid, setIsCakeFormValid] = useState(false)

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault
    // validateCakeShape()

    submitCakeForm!(true)
  }

  // TODO: validate cake form
  // const validateCakeShape = () => {
  //   if (cakeShape!.value === "") {
  //     setIsCakeFormValid(false)
  //     GlobalStore().cakeStore.cakeShapeError =
  //       "This section is required."
  //   } else {
  //     setIsCakeFormValid(true)
  //   }
  // }

  return (
    <div className="flex flex-col justify-center">
      <h5>Cake Order Form</h5>

      {/* SHAPE  */}
      <div className="form-item">
        <span>
          What would you like your <strong>Cake Shape</strong> to be?
        </span>
        <Select
          value={cakeShape?.value === "" ? "Select..." : cakeShape}
          onChange={(selectedShape: any) => {
            setCakeShape(selectedShape)
          }}
          className="form-input"
          name="order-options"
          options={CakeShapeOptions}
        />
      </div>
      {cakeShapeError && <div className="text-red-600">{cakeShapeError}</div>}

      {/* TIER  */}
      <div className="form-item">
        <span>
          How many <strong>Tiers</strong> would you like for your{" "}
          <strong>Cake</strong>?
        </span>
        <Select
          value={cakeTier?.value === "" ? "Select..." : cakeTier}
          onChange={(selectedTier: any) => setCakeTier!(selectedTier)}
          className="form-input"
          name="order-options"
          options={TierOptions}
        />
      </div>

      {/* SIZE  */}
      <div className="form-item">
        <span>
          What <strong>Size</strong> would you like your <strong>Cake</strong>{" "}
          to be?
        </span>
        <Select
          value={cakeSize?.value === "" ? "Select..." : cakeSize}
          onChange={(selectedSize: any) => setCakeSize!(selectedSize)}
          className="form-input"
          name="order-options"
          options={CakeSizeOptions}
        />
      </div>

      {/* FLAVOR INPUT */}
      <div className="form-item">
        <span>
          What <strong>Flavor</strong> would you like your <strong>Cake</strong>{" "}
          to be?
        </span>
        <input
          value={cakeFlavorInput}
          onChange={(e) => handleCakeFlavorInput!(e)}
          type="text"
          placeholder="Vanilla, Chocolate, Strawberry etc..."
          className="form-input"
          style={{ minHeight: "38px" }}
        />
      </div>

      {/* FROSTING INPUT */}
      <div className="form-item">
        <span>
          What <strong>Frosting</strong> would you like on your{" "}
          <strong>Cake</strong>?
        </span>
        <input
          value={cakeFrostingInput}
          onChange={(e) => handleCakeFrostingInput!(e)}
          type="text"
          placeholder="Vanilla Buttercream..."
          className="form-input"
          style={{ minHeight: "38px" }}
        />
      </div>

      {/* FILLING INPUT */}
      <div className="form-item">
        <span>
          What <strong>Filling</strong> would you like in your{" "}
          <strong>Cake</strong>?
        </span>
        <input
          value={cakeFillingInput}
          onChange={(e) => handleCakeFillingInput!(e)}
          type="text"
          placeholder="Vanilla Buttercream..."
          className="form-input"
          style={{ minHeight: "38px" }}
        />
      </div>

      {/* FRUIT FILLING */}
      <div className="form-item">
        <span>
          Would you like a <strong>Fruit</strong> filling inside of your{" "}
          <strong>Cake</strong>?
        </span>
        <Select
          value={
            cakeFruitFilling?.value === "" ? "Select..." : cakeFruitFilling
          }
          onChange={(selected: any) => setCakeFruitFilling!(selected)}
          className="form-input"
          name="order-options"
          options={FruitOptions}
        />
      </div>
      {/* FRUIT FILLING INPUT */}
      {cakeFruitFilling?.value === "other" && (
        <div className="form-item">
          <span>
            What other <strong>Fruit</strong> filling woud you like in your{" "}
            <strong>Cake</strong>?
          </span>
          <input
            value={cakeFruitFillingInput}
            onChange={(e) => handleCakeFruitFillingInput!(e)}
            type="text"
            placeholder="Dragonfruit..."
            className="form-input"
            style={{ minHeight: "38px" }}
          />
        </div>
      )}
      {/* FRUIT TOPPING */}
      <div className="form-item">
        <span>
          Would you like a <strong>Fruit</strong> topping on your{" "}
          <strong>Cake</strong>?
        </span>
        <Select
          value={
            cakeFruitTopping?.value === "" ? "Select..." : cakeFruitTopping
          }
          onChange={(selected: any) => setCakeFruitTopping!(selected)}
          className="form-input"
          name="order-options"
          options={FruitOptions}
        />
      </div>
      {/* FRUIT TOPPING INPUT */}
      {cakeFruitTopping?.value === "other" && (
        <div className="form-item">
          <span>
            What other <strong>Fruit</strong> topping woud you like on your{" "}
            <strong>Cake</strong>?
          </span>
          <input
            value={cakeFruitToppingInput}
            onChange={(e) => handleCakeFruitToppingInput!(e)}
            type="text"
            placeholder="Dragonfruit..."
            className="form-input"
            style={{ minHeight: "38px" }}
          />
        </div>
      )}
      <button
        className="order-form-submit"
        type="submit"
        onClick={(e) => handleSubmit(e)}>
        Submit Cake <br /> Form
      </button>
    </div>
  )
}

export default CakeOrderForm
