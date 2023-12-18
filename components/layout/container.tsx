import React from "react";

interface IContainerProps {
    children: React.ReactNode;
}

const Container = (props: IContainerProps) => {
    return <section>{props.children}</section>;
};

export default Container;
