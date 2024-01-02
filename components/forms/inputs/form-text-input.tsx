import React from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

interface IFormTextInputProps {
    label: string;
    inputClass: string;
    register: UseFormRegister<FieldValues>;
    name: string;
    placeholder?: string;
    required?: boolean;
    pattern?: RegExp;
    errors?: FieldErrors;
}

const FormTextInput: React.FC<IFormTextInputProps> = ({
    label,
    inputClass,
    register,
    name,
    placeholder = "",
    required = false,
    pattern,
    errors = {},
}) => {
    return (
        <div>
            <label className="text-xs absolute ml-2 bg-white transition-all duration-300 ease-in-out" htmlFor={name}>
                {required ? `${label}*` : label}
            </label>
            <input
                className={inputClass}
                type="text"
                placeholder={placeholder}
                {...register(name, { required, pattern: pattern || undefined })}
            />
            {errors[name] && errors[name]!.type === "required" && <p className="text-sm text-red-600 ml-4">{label} is required.</p>}
            {errors[name] && errors[name]!.type === "pattern" && <p className="text-sm text-red-600 ml-4">{label} is not valid.</p>}
        </div>
    );
};

export default FormTextInput;
