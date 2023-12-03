import BgImgContainer from "@/components/layout/home/BgImgContainer";
import PromoCard from "@/components/layout/home/PromoCard";
import Navbar from "@/components/layout/navbar";

import CakeSplash from "@/public/cake-splash.jpg";

export default function Home() {
    return (
        <div className="flex flex-col justify-between w-full">
            <Navbar />
            <div className="flex w-full h-screen justify-center items-center">
                <BgImgContainer image={CakeSplash}>
                    <PromoCard
                        titleAlt="Cake"
                        title="is always the answer"
                        description="We can always answer any of your questions with a cake."
                        link="/order"
                        linkText="Order Now"
                    />
                </BgImgContainer>
            </div>
        </div>
    );
}
