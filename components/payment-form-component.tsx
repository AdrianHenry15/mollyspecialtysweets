"use client";

import React from "react";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import { submitPayment } from "@/app/actions/actions";

const PaymentFormComponent = () => {
    const appId = process.env.SQUARE_APP_ID as string;
    const locationId = process.env.SQUARE_LOCATION_ID as string;
    return (
        <PaymentForm
            applicationId={appId}
            locationId={locationId}
            cardTokenizeResponseReceived={async (token) => {
                const result = await submitPayment(token.token);
                console.log(result);
            }}
        >
            <CreditCard />
        </PaymentForm>
    );
};

export default PaymentFormComponent;
