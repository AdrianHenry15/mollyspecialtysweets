import React, { useRef } from "react";
import { ProductType } from "@/lib/types";
import { useCartStore } from "@/stores/cart-store";
import { useCakeStore } from "@/stores/cake-store"; // Import the cake store
import CustomSelect from "@/components/products/custom-select";
import {
    CakeFillings,
    CakeFlavors,
    CakeFrostings,
    CakeShapes,
    CakeTiers,
    CakeToppings,
    Fruits,
    RoundCakeSizes,
    SheetCakeSizes,
} from "@/lib/constants";
import CustomTextarea from "../custom-textarea";
import AddToCartBtn from "../add-to-cart-btn";
import toast from "react-hot-toast";

interface CakeProductProps {
    product: ProductType;
}

const CakeProduct = (props: CakeProductProps) => {
    const { product } = props;
    const addItemToCart = useCartStore((state) => state.addItem);

    // Refs for each section that needs validation
    const tierRef = useRef<HTMLDivElement>(null);
    const sizeRef = useRef<HTMLDivElement>(null);
    const shapeRef = useRef<HTMLDivElement>(null);
    const flavorRef = useRef<HTMLDivElement>(null);
    const frostingRef = useRef<HTMLDivElement>(null);
    const fillingRef = useRef<HTMLDivElement>(null);
    const toppingRef = useRef<HTMLDivElement>(null);

    // Get state and actions from the cake store
    const {
        tier,
        size,
        shape,
        flavor,
        frosting,
        frostingFruit,
        filling,
        fillingFruit,
        topping,
        toppingFruit,
        extraDetails,
        setTier,
        setSize,
        setShape,
        setFlavor,
        setFrosting,
        setFrostingFruit,
        setFilling,
        setFillingFruit,
        setTopping,
        setToppingFruit,
        setExtraDetails,
    } = useCakeStore();

    // Error states for validation
    const [errors, setErrors] = React.useState({
        tier: false,
        size: false,
        shape: false,
        flavor: false,
        frosting: false,
        filling: false,
        topping: false,
    });

    const validateSelections = () => {
        const newErrors = {
            tier: !tier,
            size: !size,
            shape: !shape,
            flavor: !flavor,
            frosting: !frosting,
            filling: !filling,
            topping: !topping,
        };

        setErrors(newErrors);

        // Check if there are any errors
        const errorFields = Object.entries(newErrors)
            .filter(([key, hasError]) => hasError)
            .map(([key]) => key);

        // Scroll to the first error field and show a single toast
        if (errorFields.length > 0) {
            const firstErrorField = errorFields[0];

            switch (firstErrorField) {
                case "tier":
                    tierRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                    break;
                case "shape":
                    shapeRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                    break;
                case "size":
                    sizeRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                    break;
                case "flavor":
                    flavorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                    break;
                case "frosting":
                    frostingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                    break;
                case "filling":
                    fillingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                    break;
                case "topping":
                    toppingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                    break;
                default:
                    break;
            }

            // Show a single toast for all errors
            toast.error(`Please fill in the following fields: ${errorFields.join(", ")}.`);
        }

        return !Object.values(newErrors).some((error) => error);
    };

    const handleAddToCart = () => {
        if (validateSelections()) {
            const configuredProduct = {
                ...product,
                tier,
                size,
                shape,
                flavor,
                frosting,
                filling,
                topping,
                extraDetails,
            };

            addItemToCart(configuredProduct);
        }
    };

    const renderSizes = () => {
        if (shape?.trim().toLowerCase() === "round") {
            return (
                <CustomSelect
                    ref={sizeRef}
                    title="Size"
                    value={size || ""}
                    handleInputChange={(e) => setSize(e.target.value)}
                    options={RoundCakeSizes}
                    handleChange={setSize} // Using setSize from Zustand
                    error={errors.size ? "Please select a size" : undefined}
                />
            );
        } else if (shape?.trim().toLowerCase() === "sheet") {
            return (
                <CustomSelect
                    ref={sizeRef}
                    title="Size"
                    options={SheetCakeSizes}
                    value={size || ""}
                    handleInputChange={(e) => setSize(e.target.value)}
                    handleChange={setSize} // Using setSize from Zustand
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
                ref={tierRef}
                title="Tier"
                value={tier || ""}
                handleInputChange={(e) => setTier(e.target.value)}
                options={CakeTiers}
                handleChange={setTier} // Using setTier from Zustand
                error={errors.tier ? "Please select a tier" : undefined}
            />
            {/* Shape */}
            <CustomSelect
                ref={shapeRef}
                title="Shape"
                options={CakeShapes}
                value={shape || ""}
                handleInputChange={(e) => setShape(e.target.value)}
                handleChange={setShape} // Using setShape from Zustand
                error={errors.shape ? "Please select a shape" : undefined}
            />
            {/* Size */}
            {renderSizes()}
            {/* Flavor */}
            <CustomSelect
                ref={flavorRef}
                title="Flavor"
                options={CakeFlavors}
                value={flavor || ""}
                handleInputChange={(e) => setFlavor(e.target.value)}
                handleChange={setFlavor} // Using setFlavor from Zustand
                error={errors.flavor ? "Please select a flavor" : undefined}
            />
            {/* Frosting */}
            <CustomSelect
                ref={frostingRef}
                title="Frosting"
                options={CakeFrostings}
                value={frosting || ""}
                handleInputChange={(e) => setFrosting(e.target.value)}
                handleChange={setFrosting} // Using setFrosting from Zustand
                hasFruit
                fruitValue={frostingFruit as string}
                handleFruitInputChange={(e) => setFrostingFruit(e.target.value)}
                error={errors.frosting ? "Please select a frosting" : undefined}
            />
            {/* Filling */}
            <CustomSelect
                ref={fillingRef}
                title="Filling"
                options={CakeFillings}
                value={filling || ""}
                handleInputChange={(e) => setFilling(e.target.value)}
                handleChange={setFilling} // Using setFilling from Zustand
                hasFruit
                fruitValue={fillingFruit as string}
                handleFruitInputChange={(e) => setFillingFruit(e.target.value)}
                error={errors.filling ? "Please select a filling" : undefined}
            />
            {/* Topping */}
            <CustomSelect
                title="Topping"
                options={CakeToppings}
                value={topping || ""}
                handleInputChange={(e) => setTopping(e.target.value)}
                handleChange={setTopping} // Using setTopping from Zustand
                hasFruit
                fruitValue={toppingFruit as string}
                handleFruitInputChange={(e) => setToppingFruit(e.target.value)}
                error={errors.topping ? "Please select a topping" : undefined}
            />
            {/* Extra Details */}
            <CustomTextarea value={extraDetails || ""} onChange={(e) => setExtraDetails(e.target.value)} />{" "}
            {/* Using setExtraDetails from Zustand */}
            {/* Add To Cart Btn */}
            <AddToCartBtn handleAddToCart={handleAddToCart} />
        </div>
    );
};

export default CakeProduct;
