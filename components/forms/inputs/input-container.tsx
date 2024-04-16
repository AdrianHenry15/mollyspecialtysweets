import React from "react";

interface IInputContainerProps {
    children: React.ReactNode;
    setState: () => void;
    backBtn?: boolean;
    setBackBtnState?: () => void;
}

const InputContainer = (props: IInputContainerProps) => {
    const ButtonClass = "px-10 py-2 rounded-lg mx-4 bg-blue-400 transition-colors ease-in-out duration-300 text-white hover:bg-blue-700";

    return (
        <div className="flex flex-col justify-center items-center w-full transition-all duration-300 ease-in-out">
            {props.children}
            <div className="flex w-full items-center justify-center">
                <button onClick={props.setState} className={ButtonClass}>
                    Confirm
                </button>
                {props.backBtn && (
                    <button onClick={props.setBackBtnState} className={ButtonClass}>
                        Go Back
                    </button>
                )}
            </div>
        </div>
    );
};

export default InputContainer;
