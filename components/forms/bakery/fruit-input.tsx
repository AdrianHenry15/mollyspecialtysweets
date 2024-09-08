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
            {isAddingFruit ? (
                <>
                    <BakeryInput control={control} name={name} label={label} hasFruit={true} options={Fruits as []} />
                    <Button name="No Fruit" onClick={() => setIsAddingFruit(false)} />
                </>
            ) : (
                <Button name="Add Fruit" onClick={() => setIsAddingFruit(true)} />
            )}
        </div>
    );
};

export default FruitInput;
