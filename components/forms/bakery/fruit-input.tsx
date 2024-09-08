import Button from "@/components/buttons/button";
import React, { useState } from "react";
import BakeryInput from "./bakery-input";
import { Fruits } from "@/lib/constants";

interface IFruitInputProps {
    control: any;
    value: string;
    label: string;
}

const FruitInput = (props: IFruitInputProps) => {
    // State
    const [isAddingFruit, setIsAddingFruit] = useState(false);
    // Props
    const { control, value, label } = props;
    return (
        <div>
            {isAddingFruit ? (
                <BakeryInput control={control} value={value} label={label} hasFruit={false} options={Fruits as []} />
            ) : (
                <Button name="Add Fruit" onClick={() => setIsAddingFruit(true)} />
            )}
        </div>
    );
};

export default FruitInput;
