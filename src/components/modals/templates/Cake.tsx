import React from "react";
import TemplateBtn from "../../buttons/TemplateBtn";
import Template from "./Template";
import useCakeStore from "../../../hooks/useCakeStore";

const CakeModal = () => {
    const { setCakeFlavor, setCakeFrosting } = useCakeStore();
    const setVanilla = () => {
        setCakeFlavor("Vanilla");
        setCakeFrosting("Vanilla Buttercream");
    };
    return (
        <Template template={"Cake"}>
            {/* VANILLA */}
            <TemplateBtn onClick={() => setVanilla()} template="Cake" className="bg-amber-100" text="Vanilla" />
            {/* CHOCOLATE */}
            <TemplateBtn onClick={() => {}} template="Cake" className="bg-amber-900" text="Chocolate" />
            {/* STRAWBERRY */}
            <TemplateBtn onClick={() => {}} template="Cake" className="bg-rose-400" text="Strawberry" />
        </Template>
    );
};

export default CakeModal;
