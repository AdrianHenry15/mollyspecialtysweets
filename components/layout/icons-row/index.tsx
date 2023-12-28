import React from "react";

import IconItem from "./icon-item";

type IconItemType = {
    href: string;
    src: any;
    name: string;
    description: string;
    linkText: string;
};

interface IIconsRowProps {
    iconItem1: IconItemType;
    iconItem2: IconItemType;
    iconItem3: IconItemType;
}

const IconsRow = (props: IIconsRowProps) => {
    return (
        <section className="bg-black flex flex-col justify-center items-center text-center py-4 px-10 md:px-48 lg:flex-row lg:px-36">
            <IconItem
                linkText={props.iconItem1.linkText}
                href={props.iconItem1.href}
                src={props.iconItem1.src}
                name={props.iconItem1.name}
                description={props.iconItem1.description}
            />
            <IconItem
                linkText={props.iconItem2.linkText}
                href={props.iconItem2.href}
                src={props.iconItem2.src}
                name={props.iconItem2.name}
                description={props.iconItem2.description}
            />
            <IconItem
                linkText={props.iconItem3.linkText}
                href={props.iconItem3.href}
                src={props.iconItem3.src}
                name={props.iconItem3.name}
                description={props.iconItem3.description}
            />
        </section>
    );
};

export default IconsRow;
