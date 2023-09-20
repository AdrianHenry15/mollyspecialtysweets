import React from "react";
import TemplateBtn from "../../buttons/TemplateBtn";
import Template from "./Template";

const CookieModal = () => {
    return (
        <Template template="Cookie">
            {/* VANILLA */}
            <TemplateBtn onClick={() => {}} template="Cookie" className="bg-amber-100" text="Vanilla" />
            {/* CHOCOLATE */}
            <TemplateBtn onClick={() => {}} template="Cookie" className="bg-amber-900" text="Chocolate Chip" />
            {/* STRAWBERRY */}
            <TemplateBtn onClick={() => {}} template="Cookie" className="bg-rose-400" text="Strawberry" />
        </Template>
    );
};

export default CookieModal;
