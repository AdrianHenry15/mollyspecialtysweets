import React from "react";
import { Controller } from "react-hook-form";

import { BsCake2Fill } from "react-icons/bs";
import { BsCakeFill } from "react-icons/bs";

interface ICakeTierProps {
    setSingleTier: (isSingleTier: boolean) => void;
    isSingleTier: boolean;
    control: any;
}

const CakeTier = (props: ICakeTierProps) => {
    const TierClass = "border-black border-2 p-2 rounded-lg shadow-md shadow-pink-100";
    return (
        <Controller
            name="cakeTier"
            control={props.control}
            rules={{ required: "Please choose a cake tier" }}
            render={({ field }) => (
                <div className="flex flex-col ">
                    <h5 className="flex font-semibold text-xl w-full justify-start">Choose Cake Tier:</h5>
                    <div className="flex justify-evenly py-10">
                        {/* SINGLE */}
                        <div className="flex flex-col items-center" onClick={() => props.setSingleTier(true)} {...field}>
                            <BsCake2Fill className={`${props.isSingleTier ? "bg-pink-300" : "bg-transparent"} ${TierClass}`} size={75} />
                            <p className="text-xs mt-2">Single Tier</p>
                        </div>
                        {/* MULTIPLE */}
                        <div className="flex flex-col items-center" onClick={() => props.setSingleTier(false)} {...field}>
                            <BsCakeFill className={`${!props.isSingleTier ? "bg-pink-300" : "bg-transparent"} ${TierClass}`} size={75} />
                            <p className="text-xs mt-2">Multiple Tier</p>
                        </div>
                    </div>
                </div>
            )}
        />
    );
};

export default CakeTier;
