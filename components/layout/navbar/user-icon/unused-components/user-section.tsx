import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

interface IUserSection {
    profile?: boolean;
    emails?: boolean;
    phone_numbers?: boolean;
    connected_accounts?: boolean;
}

const UserSection = (props: IUserSection) => {
    const { profile, emails, phone_numbers, connected_accounts } = props;
    const { user } = useUser();
    const image = user?.hasImage ? user.imageUrl : "";

    const getSectionTitle = (title: string) => {
        return (
            <div className="flex w-full border-b-2 border-zinc-200">
                <h3>{title}</h3>
            </div>
        );
    };

    const getSectionContent = (content: string) => {
        return (
            <div className="flex items-center">
                <p>{content}</p>
            </div>
        );
    };

    const renderSections = () => {
        if (profile) {
            return (
                <div className="flex flex-col">
                    {getSectionTitle("Profile")}
                    <div className="flex items-center">
                        {/* USER ICON */}
                        <span>
                            <Image width={35} height={35} src={image} alt="user-img" />
                        </span>
                        {/* USER NAME */}
                        <h1>{user?.fullName}</h1>
                    </div>
                </div>
            );
        } else if (emails) {
            const emailAddresses = user?.emailAddresses;
            const primaryEmail = user?.primaryEmailAddress;
            return emailAddresses?.map((item, index) => {
                if (item === primaryEmail) {
                    return <p key={index}>{primaryEmail.emailAddress}</p>;
                } else {
                    return <p key={index}>{item.emailAddress}</p>;
                }
            });
        }
    };
    return <div>{renderSections()}</div>;
};

export default UserSection;
