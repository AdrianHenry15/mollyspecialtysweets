"use client";

import { useProductStore } from "@/stores/product-store";
import Image from "next/image";
import React, { useEffect } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { IoEllipsisVerticalOutline } from "react-icons/io5";

interface IProductProps {
    productId: string;
}

const Product = (props: IProductProps) => {
    // Props
    const { productId } = props;
    // Store
    const { products, isLoading, error, fetchProducts } = useProductStore();

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
    const renderArrows = () => {
        const ArrowClass = "hover:text-white text-gray-500 hover:scale-125 duration-300 transition-all ease-in-out cursor-pointer";
        return (
            <div className="flex z-30 mb-40 w-min bg-zinc-600 py-1 px-6 rounded-full mt-4 border-zinc-500 border">
                <BsArrowLeft className={ArrowClass} size={25} />
                <p className="vorder border white flex items-center justtify-center mx-6" />
                <BsArrowRight className={ArrowClass} size={25} />
            </div>
        );
    };

    const renderProductSelector = () => {
        return (
            <div className="flex items-center justify-center">
                <Image src={product.image} alt={product.name} width={100} height={100} className="flex border border-blue-500 shadow-lg" />
            </div>
        );
    };
    return (
        <div className="flex flex-col relative w-full">
            <div className="flex flex-col relative">
                {/* PICTURE */}
                <div className="flex flex-col justify-center items-center relative p-40">
                    <Image src={product.image} alt={product.name} width={400} height={400} className="flex border border-white shadow-lg" />
                    {renderArrows()}
                    {renderProductSelector()}
                </div>
                <div className="flex relative ">
                    {/* TITLE */}
                    <h5 className="">{product.name}</h5>
                    {/* PRICE */}
                    <p className="flex items-center text-start justify-center p-1 bg-blue-400 text-white w-min">
                        ${product.price.toFixed(2)} USD
                    </p>
                </div>
            </div>
            {/* TIER */}
            {/* SHAPE */}
            {/* SIZE */}
            {/* AMOUNT */}
            {/* FLAVORS */}
            {/* FROSTINGS */}
            {/* FILLINGS */}
        </div>
    );
};

export default Product;
