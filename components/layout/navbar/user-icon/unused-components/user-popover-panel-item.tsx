import { UserProfile } from "@clerk/nextjs";
import React from "react";

interface IUserPopoverPanelItemProps {
    onClick?: () => void;
    isModal?: boolean;
    title: string;
    icon: React.ReactNode;
}

const UserPopoverPanelItem = (props: IUserPopoverPanelItemProps) => {
    const { title, icon, onClick, isModal } = props;
    return (
        <div onClick={onClick} className="p-2 mx-4 hover:bg-gray-200 rounded-lg transition-colors duration-300 ease-in-out cursor-pointer">
            <div className="flex items-center justify-start">
                {/* ICON */}
                <span className="mr-4">{icon}</span>
                <div className="flex flex-col">
                    <p>{title}</p>
                </div>
            </div>
            {isModal ? (
                <div className="absolute right-0 top-0">
                    <UserProfile />
                </div>
            ) : null}
        </div>
    );
};

export default UserPopoverPanelItem;
