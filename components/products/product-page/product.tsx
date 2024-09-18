"use client";

import Image from "next/image";
import React, { useEffect } from "react";

import { useProductStore } from "@/stores/product-store";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import CookieCupcakeProduct from "./cookie-cupcake-product";
import CakeProduct from "./cake-product";
import { useCartStore } from "@/stores/cart-store";
import AddToCartBtn from "../add-to-cart-btn";

interface IProductProps {
    productId: string;
}

const Product = (props: IProductProps) => {
    // Props
    const { productId } = props;
    // Store
    const { products, isLoading, error, fetchProducts } = useProductStore();
    const addItemToCart = useCartStore((state) => state.addItem);

    useEffect(() => {
        if (products.length === 0) {
            fetchProducts();
        }
    }, [fetchProducts, products.length]);

    const product = products.find((p) => p.id === productId);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    if (!product) return <p>Product not found.</p>;

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

    // Hanlders
    const handleAddToCart = () => {
        addItemToCart(product);
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
                    <h5 className="text-gray-400/50 ml-2 text-start text-lg">{product.description}</h5>
                    {/* PRICE */}
                    <p className="flex items-center text-start justify-center px-3 py-1 mt-2 bg-blue-400 text-white w-min whitespace-nowrap rounded-full">
                        ${product.price.toFixed(2)} USD
                    </p>
                </div>
                {/* INPUTS */}
                {product.name === "Custom Cookie" ||
                    (product.name === "Custom Cupcake" && (product.collection === "Cookies" || product.collection === "Cupcakes") && (
                        <CookieCupcakeProduct product={product} />
                    ))}
                {product.name === "Custom Cake" && product.collection === "Cakes" && <CakeProduct product={product} />}
            </div>
            {product.name !== "Custom Cake" && <AddToCartBtn handleAddToCart={handleAddToCart} />}
        </div>
    );
};

export default Product;
