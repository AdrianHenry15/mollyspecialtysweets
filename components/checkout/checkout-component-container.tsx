import React from "react";

interface ICheckoutComponentContainerProps {
    title: string;
    children: React.ReactNode;
}

const CheckoutComponentContainer = (props: ICheckoutComponentContainerProps) => {
    // Props
    const { title, children } = props;
    return (
        <div className="flex flex-col w-full">
            <h5 className="text-3xl w-full flex justify-start border-b-[1px] border-gray-300 mb-6 pb-6">{title}</h5>
            {children}
        </div>
    );
};

export default CheckoutComponentContainer;
