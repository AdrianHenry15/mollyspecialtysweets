"use client";

import React, { useEffect } from "react";
import ProductItem from "./product-item";
import { ProductType } from "@/lib/types";
import { Loader } from "../loader";
import { Collection } from "@/lib/constants";
import { useProductStore } from "@/stores/product-store";

interface IProductRowProps {
    collection?: Collection;
}

const ProductRow = (props: IProductRowProps) => {
    const { collection } = props;
    const { products, isLoading, fetchProducts } = useProductStore((state) => ({
        products: state.products,
        isLoading: state.isLoading,
        fetchProducts: state.fetchProducts,
    }));

    useEffect(() => {
        // Fetch products only if they haven't been fetched yet
        if (products.length === 0) {
            fetchProducts();
        }
    }, [fetchProducts, products.length]);

    const filteredProducts = collection ? products.filter((product) => product.collection === collection) : products;

    return (
        <div className="w-full bg-black text-white relative border-y border-white shadow-lg overflow-x-hidden">
            <h5 className="text-3xl mb-24 text-white absolute mt-6 ml-6">{collection || "All Products"}</h5>
            <div className="flex items-center overflow-x-auto overflow-y-hidden h-[29rem] space-x-6 px-6">
                {isLoading ? (
                    <Loader />
                ) : (
                    filteredProducts.map((product: ProductType, index: number) => (
                        <div key={product.id} className={`${index === filteredProducts.length - 1 ? "mr-6" : ""} flex-shrink-0`}>
                            <ProductItem product={product} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductRow;
