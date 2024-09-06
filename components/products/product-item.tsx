import Image from "next/image";
import React from "react";
import Link from "next/link";

import { ProductType } from "@/lib/types";
import { BsPlusSquare } from "react-icons/bs";
import { useCartStore } from "@/stores/cart-store";

interface ProductItemProps {
    product: ProductType;
}

const ProductItem = (props: ProductItemProps) => {
    // Props
    const { product } = props;

    // Store
    const addItemToCart = useCartStore((state) => state.addItem);

    // Handlers
    const handleAddToCart = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (product.name !== "Custom Cake") {
            e.preventDefault();
            addItemToCart(product);
        }
    };

    return (
        <Link
            href={`/products/${product.id}`}
            className="relative items-center my-24 justify-center flex flex-col px-12 flex-shrink-0 w-[400px] h-[280px] rounded-md border-white"
        >
            <div className="flex w-[300px] h-[170px] relative">
                <Image
                    className="object-cover opacity-75  flex rounded-md hover:scale-105 transition-transform duration-300 ease-in-out"
                    width={400}
                    height={400}
                    src={product.image}
                    alt={product.name}
                />
                <Link onClick={handleAddToCart} href={product.name === "Custom Cake" ? `/products/${product.id}` : ""}>
                    <BsPlusSquare
                        className="hover:scale-110 ease-in-out transition-transform duration-200 absolute flex bottom-2 right-2"
                        size={25}
                    />
                </Link>
            </div>
            {/* PRODUCT TAB */}
            <div className="flex flex-col bottom-0 items-start p-1 text-xs w-full rounded-full whitespace-nowrap">
                <p className="flex text-white font-semibold mr-2 ml-1">{product.name}</p>
                <p className="flex items-center text-pink-500 rounded-full font-semibold px-2">{product.price.toFixed(2)} USD</p>
            </div>
        </Link>
    );
};

export default ProductItem;
