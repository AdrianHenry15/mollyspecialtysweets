import React from "react";

interface ICustomTextarea {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const CustomTextarea = (props: ICustomTextarea) => {
    const { value, onChange } = props;
    return (
        <div>
            <textarea
                className="h-48"
                value={value} // Bind to extraDetails state
                onChange={onChange} // Trigger handleExtraDetailsChange for textarea
            ></textarea>
            <aside className="text-zinc-400 italic my-4">Prices varied upon selection.</aside>
        </div>
    );
};

export default CustomTextarea;
