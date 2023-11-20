import React from "react";

interface StepsProps {
    children: React.ReactNode;
    title: string;
    description: string;
}

const Steps: React.FC<StepsProps> = ({ children, title, description }) => {
    return (
        <article className="flex flex-col flex-1 justify-center items-center md:px-10">
            <div className="text-center rounded-full bg-main p-4 my-10">{children}</div>
            <div className="flex flex-col justify-center items-center">
                <h3 className="font-semibold text-xl">{title}</h3>
                <p className="text-center font-light p-4 text-sm">{description}</p>
            </div>
        </article>
    );
};

export default Steps;
