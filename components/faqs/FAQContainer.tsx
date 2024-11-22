import React from "react";

interface IFAQContainerProps {
    title: string;
    children: React.ReactNode;
    id: string;
}

const FAQContainer = (props: IFAQContainerProps) => {
    return (
        <div id={props.id} className="flex flex-col w-full flex-1 px-10 lg:px-32 px">
            <h5 className="text-blue-600 text-4xl font-semibold">{props.title}</h5>
            {props.children}
        </div>
    );
};

export default FAQContainer;
