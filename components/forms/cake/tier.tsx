import React from "react";
import { Controller } from "react-hook-form";

import { BsCake2Fill } from "react-icons/bs";
import { BsCakeFill } from "react-icons/bs";
import FormContainer from "../form-container";

interface ICakeTierProps {
    setSingleTier: (isSingleTier: boolean) => void;
    isSingleTier: boolean;
    control: any;
    cakeShape: string;
}

const CakeTier = (props: ICakeTierProps) => {
    const TierClass = "border-black border-2 p-6 rounded-xl shadow-md shadow-pink-100 transition-color duration-300 ease-in-out";
    return (
        <FormContainer title="Cake Tier">
            {/* SINGLE */}
            <Controller
                name="singleTier"
                control={props.control}
                render={({ field }) => (
                    <div className="flex flex-col items-center" onClick={() => props.setSingleTier(true)} {...field}>
                        <BsCake2Fill
                            className={`${
                                props.isSingleTier || props.cakeShape === "rectangle" ? "bg-pink-300" : "bg-transparent"
                            } ${TierClass}`}
                            size={150}
                        />
                        <p className="text-xs mt-2">Single Tier</p>
                    </div>
                )}
            />
            {/* MULTIPLE */}
            <Controller
                name="multipleTier"
                control={props.control}
                render={({ field }) => (
                    <div className="flex flex-col items-center" onClick={() => props.setSingleTier(false)} {...field}>
                        <BsCakeFill
                            className={`${
                                !props.isSingleTier && props.cakeShape !== "rectangle" ? "bg-pink-300" : "bg-transparent"
                            } ${TierClass}`}
                            size={150}
                        />
                        <p className="text-xs mt-2">Multiple Tier</p>
                    </div>
                )}
            />
        </FormContainer>
    );
};

export default CakeTier;
