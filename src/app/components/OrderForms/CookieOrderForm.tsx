import React, { useState } from "react"
import Select from "react-select"
import { useGlobalStore } from "../../stores/GlobalStore"
import {
  AmountOptions,
  FruitOptions,
  SizeOptions,
} from "@/app/costants/GlobalOptions"

const CookieOrderForm = () => {
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
    setCookieSize,
    setCookieAmount,
    handleCookieFlavorInput,
    handleCookieFrostingInput,
    handleCookieFillingInput,
    setCookieFruitFilling,
    setCookieFruitTopping,
    handleCookieFruitFillingInput,
    handleCookieFruitToppingInput,
    setCookieFormSubmit,
  } = useGlobalStore().cookieStore!

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault
    setCookieFormSubmit!(true)
  }

  return (
    <div className="flex flex-col justify-center">
      <h5>Cookie Order Form</h5>
      {/* SIZE  */}
      <div className="form-item">
        <span>
          What <strong>Size</strong> would you like your{" "}
          <strong>Cookies</strong> to be?
        </span>
        <Select
          value={cookieSize?.value === "" ? "Select..." : cookieSize}
          onChange={(selectedSize: any) => setCookieSize!(selectedSize)}
          className="w-full"
          name="order-options"
          options={SizeOptions}
        />
      </div>
      {/* AMOUNT  */}
      <div className="form-item">
        <span>
          How many <strong>Cookies</strong> would you like?
        </span>
        <Select
          value={cookieAmount?.value === "" ? "Select..." : cookieAmount}
          onChange={(selected: any) => setCookieAmount!(selected)}
          className="w-full"
          name="order-options"
          options={AmountOptions}
        />
      </div>
      {/* FLAVOR INPUT */}
      <div className="form-item">
        <span>
          What <strong>Flavor</strong> would you like your{" "}
          <strong>Cookies</strong> to be?
        </span>
        <input
          value={cookieFlavorInput}
          onChange={(e) => handleCookieFlavorInput!(e)}
          type="text"
          placeholder="Vanilla, Chocolate, Strawberry etc..."
          className="w-full"
          style={{ minHeight: "38px" }}
        />
      </div>
      {/* FROSTING INPUT */}
      <div className="form-item">
        <span>
          What <strong>Frosting</strong> would you like on your{" "}
          <strong>Cookies</strong>?
        </span>
        <input
          value={cookieFrostingInput}
          onChange={(e) => handleCookieFrostingInput!(e)}
          type="text"
          placeholder="Vanilla Buttercream..."
          className="w-full"
          style={{ minHeight: "38px" }}
        />
      </div>
      {/* FILLING INPUT */}
      <div className="form-item">
        <span>
          What <strong>Filling</strong> would you like in your{" "}
          <strong>Cookies</strong>?
        </span>
        <input
          value={cookieFillingInput}
          onChange={(e) => handleCookieFillingInput!(e)}
          type="text"
          placeholder="Vanilla Buttercream..."
          className="w-full"
          style={{ minHeight: "38px" }}
        />
      </div>

      {/* FRUIT FILLING  */}
      <div className="form-item">
        <span>
          Would you like a <strong>Fruit Filling</strong> in your{" "}
          <strong>Cookies</strong>?
        </span>
        <Select
          className="w-full"
          name="order-options"
          options={FruitOptions}
          value={
            cookieFruitFilling?.value === "" ? "Select..." : cookieFruitFilling
          }
          onChange={(selected: any) => setCookieFruitFilling!(selected)}
        />
      </div>

      {/* FRUIT FILLING INPUT */}
      {cookieFruitFilling?.value === "other" && (
        <div className="form-item">
          <span>
            <strong>Describe</strong> what <strong>Fruit Filling</strong> you
            would like in your <strong>Cookies</strong>?
          </span>
          <input
            value={cookieFruitFillingInput}
            onChange={(e) => handleCookieFruitFillingInput!(e)}
            type="text"
            placeholder="Dragonfruit, Pear, Starfruit etc..."
            className="w-full"
            style={{ minHeight: "38px" }}
          />
        </div>
      )}
      {/* FRUIT TOPPING  */}
      <div className="form-item">
        <span>
          Would you like a <strong>Fruit Topping</strong> in your{" "}
          <strong>Cookies</strong>?
        </span>
        <Select
          className="w-full"
          name="order-options"
          options={FruitOptions}
          placeholder="Select..."
          value={
            cookieFruitTopping?.value === "" ? "Select..." : cookieFruitTopping
          }
          onChange={(selected: any) => setCookieFruitTopping!(selected)}
        />
      </div>

      {/* FRUIT TOPPING INPUT */}
      {cookieFruitTopping?.value === "other" && (
        <div className="form-item">
          <span>
            <strong>Describe</strong> what <strong>Fruit Topping</strong> you
            would like on your <strong>Cookies</strong>?
          </span>
          <input
            value={cookieFruitToppingInput}
            onChange={(e) => handleCookieFruitToppingInput!(e)}
            type="text"
            placeholder="Dragonfruit, Pear, Starfruit etc..."
            className="w-full"
            style={{ minHeight: "38px" }}
          />
        </div>
      )}
      <button
        className="order-form-submit"
        type="submit"
        onClick={(e) => handleSubmit(e)}>
        Submit Cookie <br /> Form
      </button>
    </div>
  )
}

export default CookieOrderForm
