"use client";

import Splash from "@/components/splash";
import "@/styles/globals.css";
import { usePathname } from "next/navigation";

import Cake from "@/public/cake-img.jpg";
import Cupcake from "@/public/cupcakes-img.jpg";
import Cookies from "@/public/cookies-img.jpg";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const getLinkTitle1 = () => {
        if (pathname === "/order/cakes") {
            return "Cupcakes";
        } else if (pathname === "/order/cookies") {
            return "Cakes";
        } else if (pathname === "/order/cupcakes") {
            return "Cookies";
        } else {
            return "Cakes";
        }
    };
    const getLinkTitle2 = () => {
        if (pathname === "/order/cakes") {
            return "Cookies";
        } else if (pathname === "/order/cookies") {
            return "Cupcakes";
        } else if (pathname === "/order/cupcakes") {
            return "Cakes";
        } else {
            return "Cakes";
        }
    };

    const getLink1 = () => {
        if (pathname === "/order/cakes") {
            return "/order/cupcakes";
        } else if (pathname === "/order/cookies") {
            return "/order/cakes";
        } else if (pathname === "/order/cupcakes") {
            return "/order/cookies";
        } else {
            return "/order/cakes";
        }
    };

    const getLink2 = () => {
        if (pathname === "/order/cakes") {
            return "/order/cookies";
        } else if (pathname === "/order/cookies") {
            return "/order/cupcakes";
        } else if (pathname === "/order/cupcakes") {
            return "/order/cakes";
        } else {
            return "/order/cakes";
        }
    };

    const getImg = () => {
        if (pathname === "/order/cakes") {
            return Cake;
        } else if (pathname === "/order/cupcakes") {
            return Cupcake;
        } else {
            return Cookies;
        }
    };

    const getTitle = () => {
        if (pathname === "/order/cakes") {
            return "Cakes";
        } else if (pathname === "/order/cupcakes") {
            return "Cupcakes";
        } else {
            return "Cookies";
        }
    };

    return (
        <div className="flex flex-col justify-center">
            <Splash
                link1={getLink1()}
                link2={getLink2()}
                link_title_1={getLinkTitle1()}
                link_title_2={getLinkTitle2()}
                img={getImg()}
                title={getTitle()}
                release_date="2024"
            />
            <div className="flex flex-col self-center w-full md:w-[600px] lg:w-[650px] xl:w-[700px]">{children}</div>
        </div>
    );
}
