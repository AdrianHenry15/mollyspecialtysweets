import React from "react"
import Select from "react-select"
import { GlobalStore } from "../../stores/GlobalStore"
import {
  AmountOptions,
  FruitOptions,
  SizeOptions,
} from "@/app/costants/GlobalOptions"

const CupcakeOrderForm = () => {
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
    setCupcakeSize,
    setCupcakeAmount,
    handleCupcakeFlavorInput,
    handleCupcakeFrostingInput,
    handleCupcakeFillingInput,
    setCupcakeFruitFilling,
    setCupcakeFruitTopping,
    handleCupcakeFruitFillingInput,
    handleCupcakeFruitToppingInput,
    submitCupcakeForm,
  } = GlobalStore().cupcakeStore!

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault
    submitCupcakeForm!(true)
  }

  return (
    <div className="flex flex-col justify-center">
      <h5>Cupcake Order Form</h5>
      {/* SIZE  */}
      <div className="form-item">
        <span>
          What <strong>Size</strong> would you like your{" "}
          <strong>Cupcakes</strong> to be?
        </span>
        <Select
          value={cupcakeSize?.value === "" ? "Select..." : cupcakeSize}
          onChange={(selected: any) => setCupcakeSize!(selected)}
          className="form-input"
          name="order-options"
          options={SizeOptions}
        />
      </div>
      {/* AMOUNT  */}
      <div className="form-item">
        <span>
          How many <strong>Cupcakes</strong> would you like?
        </span>
        <Select
          value={cupcakeAmount?.value === "" ? "Select..." : cupcakeAmount}
          onChange={(selected: any) => setCupcakeAmount!(selected)}
          className="form-input"
          name="order-options"
          options={AmountOptions}
        />
      </div>
      {/* FLAVOR INPUT */}
      <div className="form-item">
        <span>
          What <strong>Flavor</strong> would you like your{" "}
          <strong>Cupcakes</strong> to be?
        </span>
        <input
          value={cupcakeFlavorInput}
          onChange={(e) => handleCupcakeFlavorInput!(e)}
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
          <strong>Cupcakes</strong>?
        </span>
        <input
          value={cupcakeFrostingInput}
          onChange={(e) => handleCupcakeFrostingInput!(e)}
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
          <strong>Cupcakes</strong>?
        </span>
        <input
          value={cupcakeFillingInput}
          onChange={(e) => handleCupcakeFillingInput!(e)}
          type="text"
          placeholder="Vanilla Buttercream..."
          className="form-input"
          style={{ minHeight: "38px" }}
        />
      </div>

      {/* FRUIT FILLING  */}
      <div className="form-item">
        <span>
          Would you like a <strong>Fruit Filling</strong> in your{" "}
          <strong>Cupcakes</strong>?
        </span>
        <Select
          className="form-input"
          name="order-options"
          options={FruitOptions}
          value={
            cupcakeFruitFilling?.value === ""
              ? "Select..."
              : cupcakeFruitFilling
          }
          onChange={(selected: any) => setCupcakeFruitFilling!(selected)}
        />
      </div>

      {/* FRUIT FILLING INPUT */}
      {cupcakeFruitFilling?.value === "other" && (
        <div className="form-item">
          <span>
            <strong>Describe</strong> what <strong>Fruit Filling</strong> you
            would like in your <strong>Cupcakes</strong>?
          </span>
          <input
            value={cupcakeFruitFillingInput}
            onChange={(e) => handleCupcakeFruitFillingInput!(e)}
            type="text"
            placeholder="Dragonfruit, Pear, Starfruit etc..."
            className="form-input"
            style={{ minHeight: "38px" }}
          />
        </div>
      )}
      {/* FRUIT TOPPING  */}
      <div className="form-item">
        <span>
          Would you like a <strong>Fruit Topping</strong> in your{" "}
          <strong>Cupcakes</strong>?
        </span>
        <Select
          className="form-input"
          name="order-options"
          options={FruitOptions}
          placeholder="Select..."
          value={
            cupcakeFruitTopping?.value === ""
              ? "Select..."
              : cupcakeFruitTopping
          }
          onChange={(selected: any) => setCupcakeFruitTopping!(selected)}
        />
      </div>

      {/* FRUIT TOPPING INPUT */}
      {cupcakeFruitTopping?.value === "other" && (
        <div className="form-item">
          <span>
            <strong>Describe</strong> what <strong>Fruit Topping</strong> you
            would like on your <strong>Cupcakes</strong>?
          </span>
          <input
            value={cupcakeFruitToppingInput}
            onChange={(e) => handleCupcakeFruitToppingInput!(e)}
            type="text"
            placeholder="Dragonfruit, Pear, Starfruit etc..."
            className="form-input"
            style={{ minHeight: "38px" }}
          />
        </div>
      )}
      <button
        className="order-form-submit"
        type="submit"
        onClick={(e) => handleSubmit(e)}>
        Submit Cupcake <br /> Form
      </button>
    </div>
  )
}

export default CupcakeOrderForm
