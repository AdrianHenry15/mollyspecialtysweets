import React, { useState } from "react";
import { ProductType } from "@/lib/types";
import { useCartStore } from "@/stores/cart-store";

import CustomSelect from "@/components/products/custom-select"; // Import the updated CustomSelect component
import {
    Amounts,
    CakeFillings,
    CakeFlavors,
    CakeFrostings,
    CakeShapes,
    CakeTiers,
    Collection,
    CookieFillings,
    CookieFlavors,
    CookieFrostings,
    CookieToppings,
    CupcakeFillings,
    CupcakeFlavors,
    CupcakeFrostings,
    CupcakeToppings,
    Fruits,
    RoundCakeSizes,
    SheetCakeSizes,
} from "@/lib/constants";
import CustomTextarea from "../custom-textarea";
import AddToCartBtn from "../add-to-cart-btn";

interface CakeProductProps {
    product: ProductType;
}

const CakeProduct = (props: CakeProductProps) => {
    const { product } = props;
    const addItemToCart = useCartStore((state) => state.addItem);

    const [selectedTier, setSelectedTier] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedShape, setSelectedShape] = useState<string | null>(null);
    const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);
    const [selectedFrosting, setSelectedFrosting] = useState<string | null>(null);
    const [selectedFilling, setSelectedFilling] = useState<string | null>(null);
    const [selectedTopping, setSelectedTopping] = useState<string | null>(null);
    const [hasFruit, setHasFruit] = useState<string | null>(null);
    const [selectedFruit, setSelectedFruit] = useState<string | null>(null);
    const [extraDetails, setExtraDetails] = useState<string>("");

    const handleTierChange = (amount: string) => setSelectedTier(amount);
    const handleSizeChange = (size: string) => setSelectedSize(size);
    const handleShapeChange = (shape: string) => setSelectedShape(shape);
    const handleFlavorChange = (flavor: string) => setSelectedFlavor(flavor);
    const handleFrostingChange = (frosting: string) => setSelectedFrosting(frosting);
    const handleFillingChange = (filling: string) => setSelectedFilling(filling);
    const handleToppingChange = (topping: string) => setSelectedTopping(topping);
    const handleHasFruitChange = (hasFruit: string) => setHasFruit(hasFruit);
    const handleFruitChange = (fruit: string) => setSelectedFruit(fruit);
    const handleExtraDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setExtraDetails(e.target.value);

    const handleAddToCart = () => {
        const configuredProduct = {
            ...product,
            selectedTier,
            selectedSize,
            selectedShape,
            selectedFlavor,
            selectedFrosting,
            selectedFilling,
            selectedTopping,
            selectedFruit: hasFruit === "Yes" ? selectedFruit : null,
        };

        addItemToCart(configuredProduct);
    };

    const renderSizes = () => {
        if (selectedShape?.trim().toLowerCase() === "round") {
            return <CustomSelect title="Size" options={RoundCakeSizes} handleChange={handleSizeChange} />;
        } else if (selectedShape?.trim().toLowerCase()) {
            return <CustomSelect title="Size" options={SheetCakeSizes} handleChange={handleSizeChange} />;
        } else {
            return <></>;
        }
    };

    return (
        <div className="flex flex-col">
            {/* Tier */}
            <CustomSelect title="Tier" options={CakeTiers} handleChange={handleTierChange} />
            {/* Shape */}
            <CustomSelect title="Shape" options={CakeShapes} handleChange={handleShapeChange} />
            {/* Size */}
            {renderSizes()}

            {/* Flavor */}
            <CustomSelect title="Flavor" options={CakeFlavors} handleChange={handleFlavorChange} />

            {/* Frosting */}
            <CustomSelect title="Frosting" options={CakeFrostings} handleChange={handleFrostingChange} />
            {/* Filling */}
            <CustomSelect title="Filling" options={CakeFillings} handleChange={handleFillingChange} />
            {/* Topping */}
            <CustomSelect title="Topping" options={CakeFillings} handleChange={handleToppingChange} />
            {/* Fruit */}
            <CustomSelect title="Fruit?" options={["Yes", "No"]} handleChange={handleHasFruitChange} />
            {/* Which Fruit */}
            {hasFruit === "Yes" && <CustomSelect title="Which Fruit?" options={Fruits} handleChange={handleFruitChange} />}
            {/* Extra Details */}
            <CustomTextarea value={extraDetails} onChange={handleExtraDetailsChange} />
            {/* Add To Cart Btn */}
            <AddToCartBtn handleAddToCart={handleAddToCart} />
        </div>
    );
};

export default CakeProduct;
