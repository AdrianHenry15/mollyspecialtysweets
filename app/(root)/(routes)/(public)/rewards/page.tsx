import React from "react";

import AppBanner from "@/components/page-components/rewards/AppBanner";
import Banner from "@/components/page-components/rewards/Banner";
import BirthdayBanner from "@/components/page-components/rewards/BirthdayBanner";
import BonusBanner from "@/components/page-components/rewards/BonusBanner";
import SweetCashGuide from "@/components/page-components/rewards/SweetCashGuide";
import LoyaltyGuide from "@/components/page-components/rewards/LoyaltyGuide";
import RewardFAQs from "@/components/page-components/rewards/RewardFAQs";

const Rewards = () => {
    return (
        <div className="flex flex-col h-full w-full mt-0 md:mt-24">
            <Banner />
            <LoyaltyGuide />
            <BirthdayBanner />
            <BonusBanner />
            <AppBanner />
            <SweetCashGuide />
            <RewardFAQs />
        </div>
    );
};

export default Rewards;
