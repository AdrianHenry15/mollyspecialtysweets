"use client";
import React from "react";
import emailjs from "@emailjs/browser";
import { useGlobalStore } from "../stores/GlobalStore";

const Modal = () => {
    const { ...state } = useGlobalStore();

    const sendOrder = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        state.modalStore.setModal!(false);

        const templateParams = {
            // CONTACT PARAMS
            name: `${state.contactStore.firstName} ${state.contactStore.lastName}`,
            // email: state.contactStore.email,
            // phone: state.contactStore.phone,
            contactOption: state.contactStore.contactOption,
            date: state.contactStore.date,
            deliveryOption: state.contactStore.deliveryOption!.label,
            deliveryAddress: state.contactStore.deliveryAddress,
            theme: state.contactStore.theme,
            // recipient: recipient,
            colors: state.contactStore.colors,
            details: state.contactStore.details,
            // CAKE PARAMS
            cakeShape: state.cakeStore.cakeShape.label,
            cakeTier: state.cakeStore.cakeTier.label,
            cakeSize: state.cakeStore.cakeSize.label,
            cakeFlavor: state.cakeStore.cakeFlavorInput,
            cakeFrosting: state.cakeStore.cakeFrostingInput,
            cakeFilling: state.cakeStore.cakeFillingInput,
            cakeFruitFilling: state.cakeStore.cakeFruitFillingInput,
            cakeFruitTopping: state.cakeStore.cakeFruitToppingInput,
            // CUPCAKE PARAMS
            cupcakeSize: state.cupcakeStore.cupcakeSize.label,
            cupcakeAmount: state.cupcakeStore.cupcakeAmount.label,
            cupcakeFlavor: state.cupcakeStore.cupcakeFlavorInput,
            cupcakeFrosting: state.cupcakeStore.cupcakeFrostingInput,
            cupcakeFilling: state.cupcakeStore.cupcakeFillingInput,
            cupcakeFruitFilling: state.cupcakeStore.cupcakeFruitFillingInput,
            cupcakeFruitTopping: state.cupcakeStore.cupcakeFruitToppingInput,
            // COOKIE PARAMS
            cookieSize: state.cookieStore.cookieSize.label,
            cookieAmount: state.cookieStore.cookieAmount.label,
            cookieFlavor: state.cookieStore.cookieFlavorInput,
            cookieFrosting: state.cookieStore.cookieFrostingInput,
            cookieFilling: state.cookieStore.cookieFillingInput,
            cookieFruitFilling: state.cookieStore.cookieFruitFillingInput,
            cookieFruitTopping: state.cookieStore.cookieFruitToppingInput,
        };
        alert("Your Order Has Been Submitted!");

        // service id, template id, template params and public key to send order form to client
        emailjs.send(process.env.SERVICE_ID!, process.env.TEMPLATE_ID!, templateParams, process.env.PUBLIC_KEY!).then(
            function (response: any) {
                console.log("SUCCESS!", response.status, response.text);
            },
            function (error: any) {
                console.log("FAILED...", error);
            }
        );
    };
    if (!state.modalStore.modal) {
        return <div></div>;
    } else {
        return (
            <div className="modalOverlay">
                <div className="modal">
                    <span>Are you sure your forms are completed and you want to submit them?</span>
                    <div className="flex justify-evenly mt-10">
                        <button onClick={(e) => sendOrder(e)} id="modal-btn">
                            Submit Forms
                        </button>
                        <button onClick={() => state.modalStore.setModal(false)} id="modal-btn-2">
                            Edit Forms
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

export default Modal;
