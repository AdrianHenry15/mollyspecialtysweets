"use client";

import React from "react";
import { motion } from "framer-motion";

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
    const itemVariants = {
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section className="bg-black flex flex-col justify-center items-center text-center py-4 px-10 md:px-48 lg:flex-row lg:px-36">
            <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }} // Trigger when 30% of the component is visible
                transition={{ duration: 0.8, delay: 0.2 }} // Adjust delay for staggered effect
            >
                <IconItem
                    linkText={props.iconItem1.linkText}
                    href={props.iconItem1.href}
                    src={props.iconItem1.src}
                    name={props.iconItem1.name}
                    description={props.iconItem1.description}
                />
            </motion.div>

            <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }} // Trigger when 30% of the component is visible
                transition={{ duration: 0.8, delay: 0.2 }} // Adjust delay for staggered effect
            >
                <IconItem
                    linkText={props.iconItem2.linkText}
                    href={props.iconItem2.href}
                    src={props.iconItem2.src}
                    name={props.iconItem2.name}
                    description={props.iconItem2.description}
                />
            </motion.div>

            <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }} // Trigger when 30% of the component is visible
                transition={{ duration: 0.8, delay: 0.2 }} // Adjust delay for staggered effect
            >
                <IconItem
                    linkText={props.iconItem3.linkText}
                    href={props.iconItem3.href}
                    src={props.iconItem3.src}
                    name={props.iconItem3.name}
                    description={props.iconItem3.description}
                />
            </motion.div>
        </section>
    );
};

export default IconsRow;
