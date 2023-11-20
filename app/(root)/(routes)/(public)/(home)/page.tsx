import React from "react";

import PageBanner from "@/components/page-components/home/PageBanner";
import RewardsBanner from "@/components/page-components/home/RewardsBanner";
import Jumbotron from "@/components/page-components/home/Jumbotron";

const Home = () => {
    return (
        <div className="w-full flex flex-col">
            <div className="">
                <Jumbotron />
                <PageBanner />
                <RewardsBanner />
            </div>
        </div>
    );
};

export default Home;
