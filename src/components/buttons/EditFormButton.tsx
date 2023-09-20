import React from "react";

interface IEditFormButtonProps {
    href: string;
    onClick?: () => void;
    handleSubmit?: (e: any) => void;
}

const EditFormButton = (props: IEditFormButtonProps) => {
    return (
        <a className="flex justify-center" href={props.href}>
            <button className="review-form-submit" type="submit" onClick={props.onClick || props.handleSubmit}>
                Edit Form
            </button>
        </a>
    );
};

export default EditFormButton;
