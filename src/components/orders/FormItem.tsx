import React from "react";

interface IFormItemProps {
    children: JSX.Element;
}

const FormItem = (props: IFormItemProps) => {
    return <div className="form-item">{props.children}</div>;
};

export default FormItem;
