import React from "react";

interface IContactItemProps {
    children: JSX.Element;
    error: string;
}

const ContactItem = (props: IContactItemProps) => {
    return (
        <div className="my-3 flex justify-center ">
            {props.children}
            {props.error && <div className="text-red-600 text-center text-xs absolute my-14">{props.error}</div>}
        </div>
    );
};

export default ContactItem;
