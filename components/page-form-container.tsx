import React from "react";

interface IPageFormContainerProps {
    children: React.ReactNode;
    className?: string;
}

const PageFormContainer = (props: IPageFormContainerProps) => {
    return (
        <div className={`${props.className} border-[1px] border-black shadow-xl shadow-blue-500 my-24 rounded-md`}>{props.children}</div>
    );
};

export default PageFormContainer;
