import IconsRow from "@/components/layout/icons-row";
import ImgLinkOverlay from "@/components/layout/home/img-link-overlay";
import Navbar from "@/components/layout/navbar";

import Cookie from "@/public/cookie-icon.png";
import Cake from "@/public/cake-icon.png";
import Cupcake from "@/public/cupcake-icon.png";
import ImageText from "@/components/layout/image-text";
import ContactFormContainer from "@/components/contact-form-container";

export default function Home() {
    return (
        <div className="flex flex-col justify-between w-full">
            <ImgLinkOverlay />
            <IconsRow
                iconSection1={{
                    linkText: "Order Cookies Now",
                    href: "/cookies",
                    src: Cookie,
                    name: "Cookies",
                    description: "Expertly crafted artisinal cookies for a joyous indulgence",
                }}
                iconSection2={{
                    linkText: "Create A Cake",
                    href: "/cakes",
                    src: Cake,
                    name: "Cakes",
                    description: "Save the perfection of Molly's cakes—a delightful blend of quality and flavor in every bite",
                }}
                iconSection3={{
                    linkText: "Order Cupcakes Now",
                    href: "/cupcakes",
                    src: Cupcake,
                    name: "Cupcakes",
                    description: "Sweeten up your day with Molly's Cupcakery—where tiny treats bring big joy",
                }}
            />
            <ImageText />
            <ContactFormContainer />
        </div>
    );
}
