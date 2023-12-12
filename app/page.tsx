import ImageTextOverlay from "@/components/layout/home/img-text-overlay";
import Navbar from "@/components/layout/navbar";

import CakeSplash from "@/public/cake-splash.jpg";

export default function Home() {
    return (
        <div className="flex flex-col justify-between w-full">
            <Navbar />
            {/* HIDDEN ON SMALL SCREENS */}
            <div className="w-full h-screen justify-center items-center">
                <ImageTextOverlay image={CakeSplash} />
            </div>
        </div>
    );
}
