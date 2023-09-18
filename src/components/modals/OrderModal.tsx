import React from "react";
import emailjs from "@emailjs/browser";
import useContactStore from "../../hooks/useContactStore";
import useModalStore from "../../hooks/useModalStore";
import useCakeStore from "../../hooks/useCakeStore";
import useCupcakeStore from "../../hooks/useCupcakeStore";
import useCookieStore from "../../hooks/useCookieStore";

const OrderModal = () => {
    // CONTACT
    const { firstName, lastName, contactOption, date, deliveryOption, deliveryAddress, theme, colors, details } = useContactStore();
    // MODAL
    const { setOrderModal, orderModal } = useModalStore();
    // CAKE
    const { cakeShape, cakeTier, cakeSize, cakeFilling, cakeFlavor, cakeFrosting, cakeFruitFilling, cakeFruitTopping } = useCakeStore();
    // CUPCAKE
    const { cupcakeSize, cupcakeFilling, cupcakeFlavor, cupcakeFrosting, cupcakeFruitFilling, cupcakeFruitTopping, cupcakeAmount } =
        useCupcakeStore();
    // COOKIE
    const { cookieSize, cookieFilling, cookieFlavor, cookieFrosting, cookieFruitFilling, cookieFruitTopping, cookieAmount } =
        useCookieStore();

    const sendOrder = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setOrderModal(false);

        const templateParams = {
            // CONTACT PARAMS
            name: `${firstName} ${lastName}`,
            // email: email,
            // phone: phone,
            contactOption: contactOption,
            date: date,
            deliveryOption: deliveryOption!.label,
            deliveryAddress: deliveryAddress,
            theme: theme,
            // recipient: recipient,
            colors: colors,
            details: details,
            // CAKE PARAMS
            cakeShape: cakeShape.label,
            cakeTier: cakeTier.label,
            cakeSize: cakeSize.label,
            cakeFlavor: cakeFlavor,
            cakeFrosting: cakeFrosting,
            cakeFilling: cakeFilling,
            cakeFruitFilling: cakeFruitFilling,
            cakeFruitTopping: cakeFruitTopping,
            // CUPCAKE PARAMS
            cupcakeSize: cupcakeSize.label,
            cupcakeAmount: cupcakeAmount.label,
            cupcakeFlavor: cupcakeFlavor,
            cupcakeFrosting: cupcakeFrosting,
            cupcakeFilling: cupcakeFilling,
            cupcakeFruitFilling: cupcakeFruitFilling,
            cupcakeFruitTopping: cupcakeFruitTopping,
            // COOKIE PARAMS
            cookieSize: cookieSize.label,
            cookieAmount: cookieAmount.label,
            cookieFlavor: cookieFlavor,
            cookieFrosting: cookieFrosting,
            cookieFilling: cookieFilling,
            cookieFruitFilling: cookieFruitFilling,
            cookieFruitTopping: cookieFruitTopping,
        };
        alert("Your Order Has Been Submitted!");

        const serviceID = import.meta.env.VITE_SERVICE_ID;
        const templateID = import.meta.env.VITE_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_PUBLIC_KEY;

        // service id, template id, template params and public key to send order form to client
        emailjs.send(serviceID, templateID, templateParams, publicKey).then(
            function (response: any) {
                console.log("SUCCESS!", response.status, response.text);
            },
            function (error: any) {
                console.log("FAILED...", error);
            }
        );
    };
    if (!orderModal) {
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
                        <button onClick={() => setOrderModal(false)} id="modal-btn-2">
                            Edit Forms
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

export default OrderModal;
