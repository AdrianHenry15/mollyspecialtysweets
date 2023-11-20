import React from "react";

import Header from "@/components/Header";
import MenuModal from "@/components/ui/modals/MenuModal";
import MobileFooter from "@/components/MobileFooter";
import Footer from "@/components/Footer";
import OrderModal from "@/components/ui/modals/OrderModal";

export default async function SetupLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full flex flex-col items-center h-full mt-20 md:mt-0">
            <MenuModal />
            <OrderModal />
            <Header />
            {children}
            <MobileFooter />
            <Footer />
        </div>
    );
}
