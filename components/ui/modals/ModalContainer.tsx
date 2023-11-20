import React from "react";

interface IModalContainerProps {
    children: React.ReactNode;
}

const ModalContainer = (props: IModalContainerProps) => {
    return <div className="fixed w-full h-full bg-black bg-opacity-50 z-50">{props.children}</div>;
};

export default ModalContainer;
