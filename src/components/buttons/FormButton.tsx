import useModalStore from "../../hooks/useModalStore";
import React from "react";

interface IFormButtonProps {
    href: string;
    onClick?: () => void;
    handleSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const FormButton = (props: IFormButtonProps) => {
    const { orderModalError } = useModalStore();
    return (
        <div className="form-btn-container">
            <a href={props.href}>
                <button className="order-form-submit" type="submit" onClick={props.onClick || props.handleSubmit}>
                    Submit Form
                </button>
            </a>
            {orderModalError && <div className="text-red-600 absolute my-16">{orderModalError}</div>}
        </div>
    );
};

export default FormButton;
