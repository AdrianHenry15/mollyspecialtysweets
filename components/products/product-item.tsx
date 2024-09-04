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
            className="relative bg-black items-center my-24 justify-center flex flex-col px-12 flex-shrink-0 w-[400px] h-[280px] rounded-md border-white"
        >
            <Image
                className="object-cover opacity-75 w-[300px] h-[170px] flex rounded-md hover:scale-105 transition-transform duration-300 ease-in-out"
                width={400}
                height={400}
                src={product.image}
                alt={product.name}
            />
            {/* <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end rounded-md"> */}
            {/* PRODUCT TAB */}
            <div className="flex flex-col bottom-0 items-start p-1 text-xs w-full rounded-full whitespace-nowrap">
                <p className="flex text-white font-semibold mr-2 ml-1">{product.name}</p>
                <p className="flex items-center text-pink-500 rounded-full font-semibold px-2">{product.price.toFixed(2)} USD</p>
            </div>
            {/* </div> */}
        </Link>
    );
};

export default ProductItem;
