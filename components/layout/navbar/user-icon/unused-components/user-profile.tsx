import React from "react";
import UserSection from "./user-section";
import { PiCarProfileBold } from "react-icons/pi";

const UserProfile = () => {
    const getTitleContent = (title: string, aside: string) => {
        return (
            <div className="flex flex-col items-center justify-center">
                <h5>{title}</h5>
                <aside>{aside}</aside>
            </div>
        );
    };

    const getProfileNavItem = (icon: React.ReactNode, name: string) => {
        return (
            <div className="flex items-center p-4">
                <span className="mr-2">{icon}</span>
                <p>{name}</p>
            </div>
        );
    };

    return (
        <div className="flex bg-white rounded-lg w-[1000px]">
            {/* PROFILE NAV */}
            <div className="flex flex-col flex-auto">{getProfileNavItem(<PiCarProfileBold />, "Profile")}</div>
            {/* PROFILE SECTION */}
            <div className="flex flex-[4] flex-col p-6">
                {getTitleContent("Account", "Manage your account information")}
                {/* PROFILE CONTENT */}
                <div className="flex flex-col">
                    <UserSection profile />
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
