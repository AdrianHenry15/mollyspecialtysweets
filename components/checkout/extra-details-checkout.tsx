"use client";

import React, { useState } from "react";
import CheckoutComponentContainer from "./checkout-component-container";

interface IExtraDetailsCheckoutProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ExtraDetailsCheckout = (props: IExtraDetailsCheckoutProps) => {
    return (
        <CheckoutComponentContainer title="Extra Details/Comments">
            <textarea value={props.value} onChange={props.onChange} placeholder="Extra Details/Comments" />
        </CheckoutComponentContainer>
    );
};

export default ExtraDetailsCheckout;
