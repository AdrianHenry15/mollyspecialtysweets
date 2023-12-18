import React from "react";

import IconsSection from "./icons-section";

type IconSection = {
    href: string;
    src: any;
    name: string;
    description: string;
    linkText: string;
};

interface IIconsRowProps {
    iconSection1: IconSection;
    iconSection2: IconSection;
    iconSection3: IconSection;
}

const IconsRow = (props: IIconsRowProps) => {
    return (
        <section className="bg-black flex flex-col justify-center items-center text-center py-4 px-10 md:px-48 lg:flex-row lg:px-36">
            <IconsSection
                linkText={props.iconSection1.linkText}
                href={props.iconSection1.href}
                src={props.iconSection1.src}
                name={props.iconSection1.name}
                description={props.iconSection1.description}
            />
            <IconsSection
                linkText={props.iconSection2.linkText}
                href={props.iconSection2.href}
                src={props.iconSection2.src}
                name={props.iconSection2.name}
                description={props.iconSection2.description}
            />
            <IconsSection
                linkText={props.iconSection3.linkText}
                href={props.iconSection3.href}
                src={props.iconSection3.src}
                name={props.iconSection3.name}
                description={props.iconSection3.description}
            />
        </section>
    );
};

export default IconsRow;
