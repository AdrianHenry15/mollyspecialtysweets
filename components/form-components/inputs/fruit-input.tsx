import Button from "@/components/buttons/button";
import React, { useState } from "react";
import BakeryInput from "./bakery-input";
import { Fruits } from "@/lib/constants";

interface IFruitInputProps {
    control: any;
    name: string;
    label: string;
}

const FruitInput = (props: IFruitInputProps) => {
    // State
    const [isAddingFruit, setIsAddingFruit] = useState(false);

    // Props
    const { control, name = "", label } = props;

    return (
        <div>
            {isAddingFruit && <BakeryInput control={control} name={name} label={label} hasFruit={true} options={Fruits as []} />}
            <div className="flex items-center">
                {/* <Button
                    className={`flex mx-2`}
                    name={`${isAddingFruit ? "Add Fruit" : "No Fruit"}`}
                    onClick={() => setIsAddingFruit(!isAddingFruit)}
                /> */}
            </div>
        </div>
    );
};

export default FruitInput;
