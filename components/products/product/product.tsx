"use client";

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
    CupcakeFillings,
    CupcakeFlavors,
    CupcakeFrostings,
    Fruits,
} from "@/lib/constants";
import { useProductStore } from "@/stores/product-store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import CookieSize from "../../forms/cookie/size";
import { PlusIcon } from "@heroicons/react/24/outline";
import CookieCupcakeProduct from "./cookie-cupcake-product";

interface IProductProps {
    productId: string;
}

const Product = (props: IProductProps) => {
    // Props
    const { productId } = props;
    // Store
    const { products, isLoading, error, fetchProducts } = useProductStore();
    // State
    const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);
    const [selectedFrosting, setSelectedFrosting] = useState<string | null>(null);
    const [selectedFilling, setSelectedFilling] = useState<string | null>(null);
    const [hasFruit, setHasFruit] = useState<string | null>(null);
    const [selectedFruit, setSelectedFruit] = useState<string | null>(null);
    const [selectedShape, setSelectedShape] = useState<string | null>(null);
    const [selectedTier, setSelectedTier] = useState<string | null>(null);
    const [extraDetails, setExtraDetails] = useState<string>("");

    useEffect(() => {
        if (products.length === 0) {
            fetchProducts();
        }
    }, [fetchProducts, products.length]);

    const product = products.find((p) => p.id === productId);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    if (!product) return <p>Product not found.</p>;

    // Handlers
    const handleSelectOption = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
        setter(value);
    };
    const handleAmountClick = (amount: string) => setSelectedAmount(amount);
    const handleSizeClick = (size: string) => setSelectedSize(size);
    const handleFlavorClick = (flavor: string) => setSelectedFlavor(flavor);
    const handleFrostingClick = (frosting: string) => setSelectedFrosting(frosting);
    const handleFillingClick = (filling: string) => setSelectedFilling(filling);
    const handleHasFruit = (hasFruit: string) => setHasFruit(hasFruit);
    const handleFruitClick = (fruit: string) => setSelectedFruit(fruit);
    const handleShapeClick = (shape: string) => setSelectedShape(shape);
    const handleTierClick = (tier: string) => setSelectedTier(tier);
    const handleExtraDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setExtraDetails(e.target.value);

    // Render Functions
    const renderArrowSelector = () => {
        const ArrowClass = "hover:text-white text-gray-500 hover:scale-125 duration-300 transition-all ease-in-out cursor-pointer";
        return (
            <div className="flex mb-40 w-min bg-zinc-600 py-1 px-6 rounded-full mt-4 border-zinc-500 border">
                <BsArrowLeft className={ArrowClass} size={25} />
                <p className="vorder border white flex items-center justtify-center mx-6" />
                <BsArrowRight className={ArrowClass} size={25} />
            </div>
        );
    };

    const renderProductVariantSelector = () => {
        return (
            <div className="flex items-center justify-center">
                <Image
                    src={product.image}
                    alt={product.name}
                    width={100}
                    height={100}
                    className="flex border-2 border-blue-500 shadow-zinc-700 shadow-lg"
                />
            </div>
        );
    };

    const renderInputs = (title: string, type: "select" | "textarea", options?: string[], handleClick?: (item: string) => void) => {
        return (
            <div className="flex flex-col mt-4">
                <h1 className="text-white">{title.toUpperCase()}</h1>
                {type === "select" ? (
                    <div className="flex flex-wrap">
                        {options!.map((item, index) => {
                            return (
                                <p
                                    className="hover:border-blue-500 border-2 duration-300 ease-in-out transition-colors bg-zinc-700 flex items-center justify-center text-white border-zinc-500 rounded-full m-2 px-4 cursor-pointer"
                                    key={index}
                                    onClick={() => handleClick && handleClick(item)}
                                >
                                    {item}
                                </p>
                            );
                        })}
                    </div>
                ) : (
                    <textarea className="h-48" value={extraDetails} onChange={handleExtraDetailsChange}></textarea>
                )}
                <aside className="text-zinc-400 italic my-4">Prices varied upon selection.</aside>
            </div>
        );
    };

    // const renderCookieCupcakeSection = () => {
    //     return (
    //         <div className="flex flex-col">
    //             {/* Amount */}
    //             <div className="flex flex-col">{renderInputs("Amount", "select", Amounts, handleAmountClick)}</div>
    //             {/* Size */}
    //             <div className="flex flex-col">{renderInputs("Size", "select", ["Mini", "Regular"], handleSizeClick)}</div>
    //             {/* Flavor */}
    //             <div className="flex flex-col">
    //                 {renderInputs(
    //                     "Flavor",
    //                     "select",
    //                     product.collection === Collection.COOKIES ? CookieFlavors : CupcakeFlavors,
    //                     handleFlavorClick,
    //                 )}
    //             </div>
    //             {/* Frosting */}
    //             <div className="flex flex-col">
    //                 {renderInputs(
    //                     "Frosting",
    //                     "select",
    //                     product.collection === Collection.COOKIES ? CookieFrostings : CupcakeFrostings,
    //                     handleFrostingClick,
    //                 )}
    //             </div>
    //             {/* Filling */}
    //             <div className="flex flex-col">
    //                 {renderInputs(
    //                     "Filling",
    //                     "select",
    //                     product.collection === Collection.COOKIES ? CookieFillings : CupcakeFillings,
    //                     handleFillingClick,
    //                 )}
    //             </div>
    //             {/* Fruit */}
    //             <div className="flex flex-col">{renderInputs("Fruit?", "select", ["Yes", "No"], handleHasFruit)}</div>
    //             {/* Which Fruit */}
    //             {hasFruit === "Yes" && <div className="flex flex-col">{renderInputs("Which Fruit?", "select", Fruits)}</div>}
    //             {/* Extra Details */}
    //             <div className="flex flex-col">{renderInputs("Extra Details/Comments", "textarea")}</div>
    //         </div>
    //     );
    // };
    const renderCakeSection = () => {
        return (
            <div className="flex flex-col">
                {/* Shape */}
                <div className="flex flex-col">{renderInputs("Shape", "select", CakeShapes)}</div>
                {/* Tier */}
                <div className="flex flex-col">{renderInputs("Tier", "select", CakeTiers)}</div>
                {/* Shape */}
                <div className="flex flex-col">{renderInputs("Shape", "select", CakeShapes)}</div>
                {/* Flavor */}
                <div className="flex flex-col">{renderInputs("Flavor", "select", CakeFlavors)}</div>
                {/* Frosting */}
                <div className="flex flex-col">{renderInputs("Frosting", "select", CakeFrostings)}</div>
                {/* Filling */}
                <div className="flex flex-col">{renderInputs("Filling", "select", CakeFillings)}</div>
                {/* Fruit */}
                <div className="flex flex-col">{renderInputs("Fruit?", "select", ["Yes", "No"])}</div>
                {/* Which Fruit */}
                <div className="flex flex-col">{renderInputs("Which Fruit?", "select", Fruits)}</div>
                {/* Extra Details */}
                <div className="flex flex-col">{renderInputs("Extra Details/Comments", "textarea")}</div>
            </div>
        );
    };

    return (
        <div className="flex flex-col relative w-full border border-zinc-200 bg-black rounded-lg">
            <div className="flex flex-col relative p-6">
                {/* PICTURE */}
                <div className="flex flex-col justify-center items-center relative p-40">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="flex border border-white shadow-zinc-700 shadow-lg"
                    />
                    {renderArrowSelector()}
                    {renderProductVariantSelector()}
                </div>
                <div className="flex flex-col relative border-b pb-6 border-zinc-500">
                    {/* TITLE */}
                    <h5 className="text-white text-start text-6xl">{product.name}</h5>
                    {/* PRICE */}
                    <p className="flex items-center text-start justify-center px-3 py-1 mt-2 bg-blue-400 text-white w-min whitespace-nowrap rounded-full">
                        ${product.price.toFixed(2)} USD
                    </p>
                </div>
                {/* INPUTS */}
                {(product.collection === Collection.COOKIES || product.collection === Collection.CUPCAKES) && (
                    <CookieCupcakeProduct product={product} renderInputs={renderInputs} />
                )}
                {product.collection === Collection.CAKES && renderCakeSection()}
            </div>
            <button className="hover:opacity-75 duration-200 ease-in-out transition-all flex relative items-center justify-center self-center bg-blue-500 text-white w-[80%] rounded-full py-4 mt-4 mb-10">
                <PlusIcon className="text-white w-6 absolute flex left-4" />
                <p className="text-white">Add To Cart</p>
            </button>
        </div>
    );
};

export default Product;
