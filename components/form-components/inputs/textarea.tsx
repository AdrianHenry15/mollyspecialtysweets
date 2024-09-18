import React from "react";
import { Controller, useForm } from "react-hook-form";

interface ITextareaProps {
    name: string;
    label: string;
    control: any;
}

const Textarea = (props: ITextareaProps) => {
    return (
        <div>
            <label className="text-xs absolute ml-2 bg-white transition-all duration-300 ease-in-out" htmlFor="email">
                {props.label}
            </label>
            <Controller
                name="details"
                control={props.control}
                defaultValue=""
                render={({ field }) => <textarea {...field} className="border-2 border-gray-400 my-2 p-2 w-full h-40" />}
            />
        </div>
    );
};

export default Textarea;
