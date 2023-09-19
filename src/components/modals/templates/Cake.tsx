import React from "react";
import TemplateBtn from "../../buttons/TemplateBtn";
import Template from "./Template";

const CakeModal = () => {
    return (
        <Template template={"Cake"}>
            {/* VANILLA */}
            <TemplateBtn template="Cake" className="bg-amber-100" text="Vanilla" />
            {/* CHOCOLATE */}
            <TemplateBtn template="Cake" className="bg-amber-900" text="Chocolate" />
            {/* STRAWBERRY */}
            <TemplateBtn template="Cake" className="bg-rose-400" text="Strawberry" />
        </Template>
    );
};

export default CakeModal;
