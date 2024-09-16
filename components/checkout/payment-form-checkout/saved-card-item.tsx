import Image from "next/image";
import React from "react";
import { Card } from "square";

import VisaCardLogo from "@/public/card-imgs/visa-logo-png-transparent.png";
import AmericanExpressCardLogo from "@/public/card-imgs/american-express.png";
import DiscoverCardLogo from "@/public/card-imgs/discover-card.png";
import MastercardCardLogo from "@/public/card-imgs/mastercard-logo.png";

type CardName = "Visa" | "Mastercard" | "American Express" | "Discover";

interface ISavedCartItemProps {
    card: Card;
}
const SavedCardItem = (props: ISavedCartItemProps) => {
    // Props
    const { card } = props;
    // Functions
    const getCardImage = (name: CardName) => {
        switch (name) {
            case "Visa":
                return VisaCardLogo;
            case "American Express":
                return AmericanExpressCardLogo;
            case "Discover":
                return DiscoverCardLogo;
            case "Mastercard":
                return MastercardCardLogo;
            default:
                break;
        }
    };
    return (
        <div className="flex flex-col border-b border-gray-300 py-4 mb-2">
            {/* Card Info */}
            <div className="flex items-start justify-start mb-4">
                {/* Card Brand */}
                <span className="flex items-start justify-start">
                    <Image
                        // src={VisaCardLogo}
                        className="w-[60px]"
                        src={getCardImage(card.cardBrand as CardName) || ""}
                        alt="card-brand-img"
                    />
                </span>
                {/* Card Info */}
                <div className="flex flex-col items-start ml-2 mt-[15px]">
                    {/* <h5>Visa ****1607</h5> */}
                    <h5>{`${card.cardBrand} ****${card.last4}`}</h5>
                    <p>{`Expires ${card.expMonth}/${card.expYear}`}</p>
                </div>
            </div>
            {/* Card Actions */}
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center text-blue-500 text-sm">
                    <button className="mr-2">Edit</button>
                    <p>|</p>
                    <button className="ml-2">Delete</button>
                </div>
                {/* <p>Default</p> */}
            </div>
        </div>
    );
};

export default SavedCardItem;
