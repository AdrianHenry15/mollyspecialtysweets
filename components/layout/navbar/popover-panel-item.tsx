import { NavMenuType } from "@/lib/types";
import Link from "next/link";
import React from "react";

interface IPopoverPanelItem {
    icon: React.ReactNode;
    page: NavMenuType;
    description: string;
    onClick: () => void;
}

const PopoverPanelItem = (props: IPopoverPanelItem) => {
    return (
        <Link
            onClick={props.onClick}
            href={props.page.link}
            className="p-2 mx-4 hover:bg-gray-200 rounded-lg transition-colors duration-300 ease-in-out"
        >
            <div className="flex items-center justify-start">
                {/* ICON */}
                <span className="mr-4 bg-pink-500/75 rounded-lg p-4">{props.icon}</span>
                <div className="flex flex-col">
                    <h5 className="mb-2">{props.page.title}</h5>
                    <p>{props.description}</p>
                </div>
            </div>
        </Link>
    );
};

export default PopoverPanelItem;
