import IconsRow from "@/components/layout/icons-row";

import Cookie from "@/public/cookie-icon.png";
import Cake from "@/public/cake-icon.png";
import Cupcake from "@/public/cupcake-icon.png";

import CakeImg from "@/public/cake-img.jpg";
import CupcakeImg from "@/public/cupcakes-img.jpg";
import CookieImg from "@/public/cookies-img.jpg";

import CakeSplash from "@/public/cake-splash.jpg";

import ImgTextRow from "@/components/layout/sections/img-text-row";
import ContactFormContainer from "@/components/forms/contact-form-container";
import ImgTextOverlay from "@/components/layout/sections/img-text-overlay";
import MobileImgText from "@/components/layout/sections/mobile-img-text";

export default function HomePage() {
    return (
        <div className="flex flex-col justify-between w-full">
            {/* JUMBOTRON */}
            <ImgTextOverlay src={CakeSplash} name={"Molly's Specialty Sweets"} />
            {/* ICON BANNER */}
            <IconsRow
                iconItem1={{
                    linkText: "Create A Cake",
                    href: "/cakes",
                    src: Cake,
                    name: "Cakes",
                    description: "Save the perfection of Molly's cakes—a delightful blend of quality and flavor in every bite",
                }}
                iconItem2={{
                    linkText: "Order Cupcakes Now",
                    href: "/cupcakes",
                    src: Cupcake,
                    name: "Cupcakes",
                    description: "Sweeten up your day with Molly's Cupcakery—where tiny treats bring big joy",
                }}
                iconItem3={{
                    linkText: "Order Cookies Now",
                    href: "/cookies",
                    src: Cookie,
                    name: "Cookies",
                    description: "Expertly crafted artisinal cookies for a joyous indulgence",
                }}
            />
            {/* IMG TEXT ROWS */}
            <ImgTextRow
                imgLeft
                src={CakeImg}
                link={"/create-a-cake"}
                btnName="Get Free Cake Estimate"
                title={"Cake"}
                description={
                    "Indulge in delectable treats crafted with precision, delivering a burst of irresistible flavor in every bite. Elevate your dessert experience with our uniquely designed cakes, a celebration of sweetness"
                }
            />
            <ImgTextRow
                textLeft
                src={CupcakeImg}
                link={"/cupcakes"}
                btnName="Get Free Cupcake Estimate"
                title={"Cupcakes"}
                description={
                    "Indulge in delectable treats crafted with precision, delivering a burst of irresistible flavor in every bite. Elevate your dessert experience with our uniquely designed cakes, a celebration of sweetness"
                }
            />
            <ImgTextRow
                imgLeft
                src={CookieImg}
                link={"/cookies"}
                btnName="Get Free Cookie Estimate"
                title={"Cookies"}
                description={
                    "Indulge in delectable treats crafted with precision, delivering a burst of irresistible flavor in every bite. Elevate your dessert experience with our uniquely designed cakes, a celebration of sweetness"
                }
            />
            {/* MOBILE TEXT ROWS */}
            <MobileImgText
                textLeft
                src={CakeImg}
                link={"/cakes"}
                title={"Cakes"}
                description={
                    "Indulge in delectable treats crafted with precision, delivering a burst of irresistible flavor in every bite. Elevate your dessert experience with our uniquely designed cakes, a celebration of sweetness"
                }
            />
            <MobileImgText
                src={CupcakeImg}
                link={"/cupcakes"}
                title={"Cupcakes"}
                description={
                    "Indulge in delectable treats crafted with precision, delivering a burst of irresistible flavor in every bite. Elevate your dessert experience with our uniquely designed cakes, a celebration of sweetness"
                }
            />
            <MobileImgText
                textLeft
                src={CookieImg}
                link={"/cookies"}
                title={"Cookies"}
                description={
                    "Indulge in delectable treats crafted with precision, delivering a burst of irresistible flavor in every bite. Elevate your dessert experience with our uniquely designed cakes, a celebration of sweetness"
                }
            />
            <ContactFormContainer />
        </div>
    );
}
