import React from "react";
import Steps from "./Steps";

import { LuSmartphone } from "react-icons/lu";
import { PiIceCreamLight } from "react-icons/pi";
import { BsCash } from "react-icons/bs";

const LoyaltyGuide = () => {
    return (
        <section className="flex flex-col justify-center items-center py-10">
            <div className="flex flex-col justify-center items-center">
                <h2 className="font-semibold text-3xl">How it works</h2>
                <p className="font-light">Start earning Cream in three easy steps</p>
            </div>
            <div className="flex flex-col flex-1 justify-center items-center md:flex-row">
                <Steps title="Sign Up" description="It's as easy as entering a phone number in-store, on our website, or through our app">
                    <LuSmartphone size={150} />
                </Steps>
                <Steps
                    title="Earn Cream"
                    description="Earn 1 Cream for every qualifying $1 spent, and 1 Cream for every $2 spent on catering orders"
                >
                    <PiIceCreamLight size={150} />
                </Steps>
                <Steps
                    title="Redeem Rewards"
                    description="100 Cream turns into $10 Cream Cash, which can be spent online, in-store, or through our app"
                >
                    <BsCash size={150} />
                </Steps>
            </div>
        </section>
    );
};

export default LoyaltyGuide;
