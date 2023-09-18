import React from "react";

interface IContactInputProps {
    value: string;
    onChange: (e: any) => void;
    placeholder: string;
}

const ContactInput = (props: IContactInputProps) => {
    return <input value={props.value} onChange={props.onChange} id="contact-input" placeholder={props.placeholder} type="text" />;
};

export default ContactInput;
