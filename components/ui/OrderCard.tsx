import Link from "next/link";
import React from "react";

interface IOrderCardProps {
    children: React.ReactNode;
    name: string;
    description: string;
}

const OrderCard = (props: IOrderCardProps) => {
    const source = props.name.toLowerCase().replace(" ", "-");
    return (
        <Link href={source} className="flex bg-white my-2 mx-10 p-4 rounded-md self-center max-w-[300px] md:w-[300px]">
            <>
                <div className="mr-10">{props.children}</div>
                <div className="flex flex-col">
                    <h3 className="font-bold text-lg">{props.name}</h3>
                    <p className="font-light text-xs">{props.description}</p>
                </div>
            </>
        </Link>
    );
};

export default OrderCard;
