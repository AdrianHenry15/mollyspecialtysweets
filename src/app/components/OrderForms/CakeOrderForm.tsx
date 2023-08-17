"use client";
import React from "react";
import Select from "react-select";
import { useGlobalStore } from "../../stores/GlobalStore";

const TierOptions = [
  { value: "single", label: "Single" },
  { value: "multiple", label: "Multiple" },
];

const CakeShapeOptions = [
  { value: "round", label: "Round" },
  { value: "sheet", label: "Sheet" },
];

const CakeSizeOptions = [
  { value: "6 inch", label: "6 inch (18 Servings)" },
  { value: "8 inch", label: "8 inch (32 Servings)" },
  { value: "10 inch", label: "10 inch (50 Servings)" },
  { value: "12 inch", label: "12 inch (72 Servings)" },
  { value: "14 inch", label: "14 inch (98 Servings)" },
  { value: "16 inch", label: "16 inch (128 Servings)" },
];

const CakeOrderForm = () => {
  const { ...state } = useGlobalStore().cakeStore;

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault;
    state.setCakeFormSubmit(true);
  };

  return (
    <div className="flex flex-col justify-center">
      <h5>Cake Order Form</h5>

      {/* SHAPE  */}
      <div className="form-item">
        <span>
          What would you like your <strong>Cake Shape</strong> to be?
        </span>
        <Select
          value={state.cakeShape.value === "" ? "Select..." : state.cakeShape}
          onChange={(selectedShape: any) => state.setCakeShape!(selectedShape)}
          className="form-input"
          name="order-options"
          options={CakeShapeOptions}
        />
        {state.cakeShapeError && <div className="text-red-600">{state.cakeShapeError}</div>}
      </div>

      {/* TIER  */}
      <div className="form-item">
        <span>
          How many <strong>Tiers</strong> would you like for your <strong>Cake</strong>?
        </span>
        <Select
          value={state.cakeTier.value === "" ? "Select..." : state.cakeTier}
          onChange={(selectedTier: any) => state.setCakeTier!(selectedTier)}
          className="form-input"
          name="order-options"
          options={TierOptions}
        />
        {state.cakeTierError && <div className="text-red-600">{state.cakeTierError}</div>}
      </div>

      {/* SIZE  */}
      <div className="form-item">
        <span>
          What <strong>Size</strong> would you like your <strong>Cake</strong> to be?
        </span>
        <Select
          value={state.cakeSize.value === "" ? "Select..." : state.cakeSize}
          onChange={(selectedSize: any) => state.setCakeSize!(selectedSize)}
          className="form-input"
          name="order-options"
          options={CakeSizeOptions}
        />
        {state.cakeSizeError && <div className="text-red-600">{state.cakeSizeError}</div>}
      </div>

      {/* FLAVOR INPUT */}
      <div className="form-item">
        <span>
          What <strong>Flavor</strong> would you like your <strong>Cake</strong> to be?
        </span>
        <input
          value={state.cakeFlavorInput}
          onChange={(e) => state.handleCakeFlavorInput!(e)}
          type="text"
          placeholder="Vanilla, Chocolate, Strawberry etc..."
          className="form-input"
          style={{ minHeight: "38px" }}
        />
        {state.cakeFlavorInputError && <div className="text-red-600">{state.cakeFlavorInputError}</div>}
      </div>

      {/* FROSTING INPUT */}
      <div className="form-item">
        <span>
          What <strong>Frosting</strong> would you like on your <strong>Cake</strong>?
        </span>
        <input
          value={state.cakeFrostingInput}
          onChange={(e) => state.handleCakeFrostingInput!(e)}
          type="text"
          placeholder="Vanilla Buttercream..."
          className="form-input"
          style={{ minHeight: "38px" }}
        />
        {state.cakeFrostingInputError && <div className="text-red-600">{state.cakeFlavorInputError}</div>}
      </div>

      {/* FILLING INPUT */}
      <div className="form-item">
        <span>
          What <strong>Filling</strong> would you like in your <strong>Cake</strong>?
        </span>
        <input
          value={state.cakeFillingInput}
          onChange={(e) => state.handleCakeFillingInput!(e)}
          type="text"
          placeholder="Vanilla Buttercream..."
          className="form-input"
          style={{ minHeight: "38px" }}
        />
        {state.cakeFillingInputError && <div className="text-red-600">{state.cakeFillingInputError}</div>}
      </div>

      {/* FRUIT FILLING */}
      <div className="form-item">
        <span>
          Would you like a <strong>Fruit</strong> filling inside of your <strong>Cake</strong>?
        </span>
        <input
          placeholder="Strawberry Filling..."
          style={{ minHeight: "38px" }}
          type="text"
          value={state.cakeFruitFillingInput}
          onChange={(e) => state.handleCakeFruitFillingInput(e)}
          className="form-input"
        />
        {state.cakeFruitFillingInputError && <div className="text-red-600">{state.cakeFruitFillingInputError}</div>}
      </div>
      {/* FRUIT TOPPING */}
      <div className="form-item">
        <span>
          Would you like a <strong>Fruit</strong> topping on your <strong>Cake</strong>?
        </span>
        <input
          value={state.cakeFruitToppingInput}
          onChange={(selected: any) => state.handleCakeFruitToppingInput(selected)}
          className="form-input"
          placeholder="Strawberries..."
          style={{ minHeight: "38px" }}
          type="text"
        />
        {state.cakeFruitToppingInputError && <div className="text-red-600">{state.cakeFruitToppingInputError}</div>}
      </div>
      <button className="order-form-submit" type="submit" onClick={(e) => handleSubmit(e)}>
        Submit Cake <br /> Form
      </button>
    </div>
  );
};

export default CakeOrderForm;
