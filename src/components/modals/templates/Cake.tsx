import React from "react";
import TemplateBtn from "../../buttons/TemplateBtn";
import Template from "./Template";
import useCakeStore from "../../../hooks/useCakeStore";

const CakeModal = () => {
    const { setCakeFlavor, setCakeFrosting, setCakeFilling } = useCakeStore();
    const setVanilla = () => {
        setCakeFlavor("Vanilla");
        setCakeFrosting("Vanilla Buttercream");
        setCakeFilling("Vanilla Custard");
    };

    const setChocolate = () => {
        setCakeFlavor("Chocolate");
        setCakeFrosting("Chocolate Buttercream");
        setCakeFilling("Chocolate Custard");
    };

    const setStrawberry = () => {
        setCakeFlavor("Strawberry");
        setCakeFrosting("Strawberry Buttercream");
        setCakeFilling("Strawberry Custard");
    };

    return (
        <Template template={"Cake"}>
            {/* VANILLA */}
            <TemplateBtn onClick={() => setVanilla()} template="Cake" className="bg-amber-100" text="Vanilla" />
            {/* CHOCOLATE */}
            <TemplateBtn onClick={() => setChocolate()} template="Cake" className="bg-amber-900" text="Chocolate" />
            {/* STRAWBERRY */}
            <TemplateBtn onClick={() => setStrawberry()} template="Cake" className="bg-rose-400" text="Strawberry" />
        </Template>
    );
};

export default CakeModal;
