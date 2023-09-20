import React from "react";
import TemplateBtn from "../../buttons/TemplateBtn";
import Template from "./Template";
import useCookieStore from "../../../hooks/useCookieStore";

const CookieModal = () => {
    const { setCookieFlavor, setCookieFrosting } = useCookieStore();
    const setVanilla = () => {
        setCookieFlavor("Vanilla");
        setCookieFrosting("Vanilla Buttercream");
    };

    const setChocolate = () => {
        setCookieFlavor("Chocolate");
        setCookieFrosting("Chocolate Buttercream");
    };

    const setStrawberry = () => {
        setCookieFlavor("Strawberry");
        setCookieFrosting("Strawberry Buttercream");
    };
    return (
        <Template template="Cookie">
            {/* VANILLA */}
            <TemplateBtn onClick={() => setVanilla()} template="Cookie" className="bg-amber-100" text="Vanilla" />
            {/* CHOCOLATE */}
            <TemplateBtn onClick={() => setChocolate()} template="Cookie" className="bg-amber-900" text="Chocolate Chip" />
            {/* STRAWBERRY */}
            <TemplateBtn onClick={() => setStrawberry()} template="Cookie" className="bg-rose-400" text="Strawberry" />
        </Template>
    );
};

export default CookieModal;
