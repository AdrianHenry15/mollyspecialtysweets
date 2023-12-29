import React from "react";
import CookieSize from "./size";
import CookieFlavor from "./flavor";
import CookieFrosting from "./frosting";
import CookieFilling from "./filling";

const CookieForm = () => {
    return (
        <section>
            <CookieSize />
            <CookieFlavor />
            <CookieFrosting />
            <CookieFilling />
        </section>
    );
};

export default CookieForm;
