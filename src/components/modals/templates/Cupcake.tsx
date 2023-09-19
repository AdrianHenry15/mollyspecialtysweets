import React from "react";
import TemplateBtn from "../../buttons/TemplateBtn";
import Template from "./Template";

const CupcakeModal = () => {
    return (
        <Template template="Cupcake">
            {/* VANILLA */}
            <TemplateBtn template="Cupcake" className="bg-amber-100" text="Vanilla" />
            {/* CHOCOLATE */}
            <TemplateBtn template="Cupcake" className="bg-amber-900" text="Chocolate" />
            {/* STRAWBERRY */}
            <TemplateBtn template="Cupcake" className="bg-rose-400" text="Strawberry" />
        </Template>
    );
};

export default CupcakeModal;
