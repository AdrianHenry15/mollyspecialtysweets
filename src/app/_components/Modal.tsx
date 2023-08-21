"use client";
import React from "react";
import emailjs from "@emailjs/browser";
import { useGlobalStore } from "../_stores/GlobalStore";

const Modal = () => {
    const { modal, setModal } = useGlobalStore().modalStore!;
    // CONTACT STORE
    const { firstName, lastName, email, phone, date, deliveryOption, deliveryAddress, occasion, recipient, colors, details } =
        useGlobalStore().contactStore!;
    // CAKE STORE
    const {
        cakeShape,
        cakeTier,
        cakeSize,
        cakeFlavorInput,
        cakeFrostingInput,
        cakeFillingInput,

        cakeFruitFillingInput,
        cakeFruitToppingInput,
    } = useGlobalStore().cakeStore!;
    //CUPCAKE STORE
    const {
        cupcakeSize,
        cupcakeAmount,
        cupcakeFlavorInput,
        cupcakeFrostingInput,
        cupcakeFillingInput,

        cupcakeFruitFillingInput,
        cupcakeFruitToppingInput,
    } = useGlobalStore().cupcakeStore!;
    // COOKIE STORE
    const {
        cookieSize,
        cookieAmount,
        cookieFillingInput,
        cookieFrostingInput,
        cookieFlavorInput,

        cookieFruitFillingInput,
        cookieFruitToppingInput,
    } = useGlobalStore().cookieStore!;

    const sendOrder = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setModal!(false);

        const templateParams = {
            // CONTACT PARAMS
            name: `${firstName} ${lastName}`,
            email: email,
            phone: phone,
            date: date,
            deliveryOption: deliveryOption!.label,
            deliveryAddress: deliveryAddress,
            occasion: occasion,
            recipient: recipient,
            colors: colors,
            details: details,
            // CAKE PARAMS
            cakeShape: cakeShape.label,
            cakeTier: cakeTier.label,
            cakeSize: cakeSize.label,
            cakeFlavor: cakeFlavorInput,
            cakeFrosting: cakeFrostingInput,
            cakeFilling: cakeFillingInput,
            cakeFruitFilling: cakeFruitFillingInput,
            cakeFruitTopping: cakeFruitToppingInput,
            // CUPCAKE PARAMS
            cupcakeSize: cupcakeSize.label,
            cupcakeAmount: cupcakeAmount.label,
            cupcakeFlavor: cupcakeFlavorInput,
            cupcakeFrosting: cupcakeFrostingInput,
            cupcakeFilling: cupcakeFillingInput,
            cupcakeFruitFilling: cupcakeFruitFillingInput,
            cupcakeFruitTopping: cupcakeFruitToppingInput,

            // COOKIE PARAMS
            cookieSize: cookieSize.label,
            cookieAmount: cookieAmount.label,
            cookieFlavor: cookieFlavorInput,
            cookieFrosting: cookieFrostingInput,
            cookieFilling: cookieFillingInput,
            cookieFruitFilling: cookieFruitFillingInput,
            cookieFruitTopping: cookieFruitToppingInput,
        };
        alert("Your Order Has Been Submitted!");

        // service id, template id, template params and public key to send order form to client
        emailjs.send("service_xy138l8", "template_qtym3op", templateParams, "C0uERlxhef55UiLEd").then(
            function (response: any) {
                console.log("SUCCESS!", response.status, response.text);
            },
            function (error: any) {
                console.log("FAILED...", error);
            }
        );
    };
    if (!modal) {
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
                        <button onClick={() => setModal(false)} id="modal-btn-2">
                            Edit Forms
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

export default Modal;