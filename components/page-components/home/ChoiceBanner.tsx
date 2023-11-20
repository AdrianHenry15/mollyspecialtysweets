import React from "react";

import ChoiceCard from "@/components/ui/ChoiceCard";
import Logo from "@/public/cake-icon.png";
import BirthdayPic from "@/public/confetti.png";
import PartyPic from "@/public/champagne-glass.png";

import Image from "next/image";

const ChoiceBanner = () => {
    return (
        <section className="flex flex-col px-4 py-4 items-center justify-center md:flex-row md:justify-evenly">
            <ChoiceCard
                title="WEDDINGS"
                link="/weddings"
                linkTitle="VIEW WEDDING PAGE"
                description="Discover edible elegance where our wedding cakes blend artistic design with delectable flavors, 
                turning your sppecial day into a sweet masterpiece."
            >
                <Image src={Logo} alt="logo" width={50} height={50} />
            </ChoiceCard>
            <ChoiceCard
                title="BIRTHDAYS"
                link="/birthdays"
                linkTitle="VIEW BIRTHDAY PAGE"
                description="Celebrate life's sweet moments with our delightful fusion of artistic flair and irresistible flavors, 
                transforming your special day into a celebration of pure bliss."
            >
                <Image src={BirthdayPic} alt="logo" width={50} height={50} />
            </ChoiceCard>
            <ChoiceCard
                title="PARTIES"
                link="/parties"
                linkTitle="VIEW PARTIES PAGE"
                description="Infuse your gatherings with sweetness and style where our party cakes blend artistic creativity with mouth watering flavors, 
                ensuring every moment becomes a taste-worthy celebration."
            >
                <Image src={PartyPic} alt="logo" width={50} height={50} />
            </ChoiceCard>
        </section>
    );
};

export default ChoiceBanner;
