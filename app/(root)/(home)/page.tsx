import IconsRow from "@/components/layout/icons-row";

import Splash from "@/components/splashes/splash";
import ProductRow from "@/components/products/product-row";

import CakeSplash from "@/public/cake-splash.jpg";
import Cookie from "@/public/cookie-icon.png";
import Cake from "@/public/cake-icon.png";
import Cupcake from "@/public/cupcake-icon.png";
import ContactFormContainer from "@/components/form-components/forms/contact-form-container";

export default function HomePage() {
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
            {/* ICON ROW */}
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
            {/* CAKE ROW */}
            {/* <ProductRow collection="Cakes" className="bg-emerald-900" /> */}
            {/* BANNER */}
            {/* <Banner img={BakingBanner} /> */}
            {/* CUPCAKE ROW */}
            {/* <ProductRow collection="Cupcakes" className="bg-pink-900" /> */}
            {/* BANNER */}
            {/* <Banner img={CupcakeBanner} /> */}
            {/* COOKIE ROW */}
            {/* <ProductRow collection="Cookies" className="bg-amber-900" /> */}
            <ContactFormContainer />
        </div>
    );
}
