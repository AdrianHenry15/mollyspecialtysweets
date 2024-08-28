"use client";

import React, { useEffect, useState } from "react";
import ProductItem from "./product-item";
import { ProductType } from "@/lib/types";
import axios from "axios";
import { Loader } from "../loader";

const ProductRow = () => {
    // State
    const [products, setProducts] = useState<ProductType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get("/api/products");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex p-4">
            {products.map((product, index) => {
                if (isLoading) {
                    return <Loader key={index} />;
                } else {
                    return <ProductItem key={index} product={product} />;
                }
            })}
        </div>
    );
};

export default ProductRow;
