"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import CakeSplash from "@/public/cake-splash.jpg";
import ContactFormContainer from "@/components/forms/contact-form-container";
import IconsRow from "@/components/layout/icons-row";
import Cookie from "@/public/cookie-icon.png";
import Cake from "@/public/cake-icon.png";
import Cupcake from "@/public/cupcake-icon.png";
import Splash from "@/components/splashes/splash";
import ProductRow from "@/components/products/product-row";
import { ProductType } from "@/lib/types";
import { Loader } from "@/components/loader";
import { Category } from "@/lib/constants";

export default function HomePage() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get("/api/products"); // Adjust API endpoint if necessary
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);
    return (
        <div className="flex flex-col justify-between w-full">
            {/* JUMBOTRON */}
            <Splash
                link1="/contact-us"
                link_title_1="Contact Us"
                link2="/estimate"
                link_title_2="Estimate"
                img={CakeSplash}
                title="Molly's Specialty Sweets"
            />
            {isLoading ? <Loader /> : <ProductRow />}
            {/* ICON BANNER */}
            <IconsRow
                iconItem1={{
                    linkText: "Create A Cake",
                    href: "/order/cakes",
                    src: Cake,
                    name: "Cakes",
                    description: "Save the perfection of Molly's cakes—a delightful blend of quality and flavor in every bite",
                }}
                iconItem2={{
                    linkText: "Order Cupcakes Now",
                    href: "/order/cupcakes",
                    src: Cupcake,
                    name: "Cupcakes",
                    description: "Sweeten up your day with Molly's Cupcakery—where tiny treats bring big joy",
                }}
                iconItem3={{
                    linkText: "Order Cookies Now",
                    href: "/order/cookies",
                    src: Cookie,
                    name: "Cookies",
                    description: "Expertly crafted artisinal cookies for a joyous indulgence",
                }}
            />
            <ContactFormContainer />
        </div>
    );
}
