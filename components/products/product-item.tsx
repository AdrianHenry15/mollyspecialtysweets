import Image from "next/image";
import React from "react";
import Link from "next/link";

import { ProductType } from "@/lib/types";

interface ProductItemProps {
    product: ProductType;
}

const ProductItem = (props: ProductItemProps) => {
    // Props
    const { product } = props;

    return (
        <Link
            href={`/products/${product.id}`}
            className="relative bg-black items-center my-24 justify-center flex flex-shrink-0 w-[300px] h-[300px] rounded-md border-white border"
        >
            <Image
                className="object-cover opacity-75 w-[200px] h-[200px] flex rounded-md hover:scale-105 transition-transform duration-300 ease-in-out"
                width={400}
                height={400}
                src={product.image}
                alt={product.name}
            />
            {/* <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end rounded-md"> */}
            {/* PRODUCT TAB */}
            <div className="flex absolute bottom-0 justify-end items-center p-1 text-xs ml-2 mb-2 border border-white w-min rounded-full whitespace-nowrap">
                <p className="flex text-white font-semibold mr-2 ml-1">{product.name}</p>
                <p className="flex items-center bg-pink-500 rounded-full font-semibold text-white py-1 px-2">
                    {product.price.toFixed(2)} USD
                </p>
            </div>
            {/* </div> */}
        </Link>
    );
};

export default ProductItem;
