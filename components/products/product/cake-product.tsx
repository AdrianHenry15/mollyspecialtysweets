import React, { useState } from "react";
import { ProductType } from "@/lib/types";
import { useCartStore } from "@/stores/cart-store";

import CustomSelect from "@/components/products/custom-select";
import { CakeFillings, CakeFlavors, CakeFrostings, CakeShapes, CakeTiers, Fruits, RoundCakeSizes, SheetCakeSizes } from "@/lib/constants";
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

    // Error states for validation
    const [errors, setErrors] = useState({
        tier: false,
        size: false,
        shape: false,
        flavor: false,
        frosting: false,
        filling: false,
        topping: false,
        fruit: false,
    });

    const handleTierChange = (tier: string) => setSelectedTier(tier);
    const handleSizeChange = (size: string) => setSelectedSize(size);
    const handleShapeChange = (shape: string) => setSelectedShape(shape);
    const handleFlavorChange = (flavor: string) => setSelectedFlavor(flavor);
    const handleFrostingChange = (frosting: string) => setSelectedFrosting(frosting);
    const handleFillingChange = (filling: string) => setSelectedFilling(filling);
    const handleToppingChange = (topping: string) => setSelectedTopping(topping);
    const handleHasFruitChange = (hasFruit: string) => setHasFruit(hasFruit);
    const handleFruitChange = (fruit: string) => setSelectedFruit(fruit);
    const handleExtraDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setExtraDetails(e.target.value);

    const validateSelections = () => {
        const newErrors = {
            tier: !selectedTier,
            size: !selectedSize,
            shape: !selectedShape,
            flavor: !selectedFlavor,
            frosting: !selectedFrosting,
            filling: !selectedFilling,
            topping: !selectedTopping,
            fruit: hasFruit === "Yes" && !selectedFruit,
        };

        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error);
    };

    const handleAddToCart = () => {
        if (validateSelections()) {
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
                extraDetails,
            };

            addItemToCart(configuredProduct);
        }
    };

    const renderSizes = () => {
        if (selectedShape?.trim().toLowerCase() === "round") {
            return (
                <CustomSelect
                    title="Size"
                    options={RoundCakeSizes}
                    handleChange={handleSizeChange}
                    error={errors.size ? "Please select a size" : undefined}
                />
            );
        } else if (selectedShape?.trim().toLowerCase() === "sheet") {
            return (
                <CustomSelect
                    title="Size"
                    options={SheetCakeSizes}
                    handleChange={handleSizeChange}
                    error={errors.size ? "Please select a size" : undefined}
                />
            );
        } else {
            return null;
        }
    };

    return (
        <div className="flex flex-col">
            {/* Tier */}
            <CustomSelect
                title="Tier"
                options={CakeTiers}
                handleChange={handleTierChange}
                error={errors.tier ? "Please select a tier" : undefined}
            />
            {/* Shape */}
            <CustomSelect
                title="Shape"
                options={CakeShapes}
                handleChange={handleShapeChange}
                error={errors.shape ? "Please select a shape" : undefined}
            />
            {/* Size */}
            {renderSizes()}
            {/* Flavor */}
            <CustomSelect
                title="Flavor"
                options={CakeFlavors}
                handleChange={handleFlavorChange}
                error={errors.flavor ? "Please select a flavor" : undefined}
            />
            {/* Frosting */}
            <CustomSelect
                title="Frosting"
                options={CakeFrostings}
                handleChange={handleFrostingChange}
                error={errors.frosting ? "Please select a frosting" : undefined}
            />
            {/* Filling */}
            <CustomSelect
                title="Filling"
                options={CakeFillings}
                handleChange={handleFillingChange}
                error={errors.filling ? "Please select a filling" : undefined}
            />
            {/* Topping */}
            <CustomSelect
                title="Topping"
                options={CakeFillings}
                handleChange={handleToppingChange}
                error={errors.topping ? "Please select a topping" : undefined}
            />
            {/* Fruit */}
            <CustomSelect
                title="Fruit?"
                options={["Yes", "No"]}
                handleChange={handleHasFruitChange}
                error={errors.fruit ? "Please select if you want fruit" : undefined}
            />
            {/* Which Fruit */}
            {hasFruit === "Yes" && (
                <CustomSelect
                    title="Which Fruit?"
                    options={Fruits}
                    handleChange={handleFruitChange}
                    error={errors.fruit ? "Please select a fruit" : undefined}
                />
            )}
            {/* Extra Details */}
            <CustomTextarea value={extraDetails} onChange={handleExtraDetailsChange} />
            {/* Add To Cart Btn */}
            <AddToCartBtn handleAddToCart={handleAddToCart} />
        </div>
    );
};

export default CakeProduct;
