"use client"
import React from "react"
import emailjs from "@emailjs/browser"
import { GlobalStore } from "../stores/GlobalStore"

const Modal = () => {
  const { modal, setModal } = GlobalStore().modalStore!
  // CONTACT STORE
  const {
    firstName,
    lastName,
    email,
    phone,
    date,
    deliveryOption,
    deliveryAddress,
    occasion,
    recipient,
    colors,
    details,
  } = GlobalStore().contactStore!
  // CAKE STORE
  const {
    cakeShape,
    cakeTier,
    cakeSize,
    cakeFlavorInput,
    cakeFrostingInput,
    cakeFillingInput,
    cakeFruitFilling,
    cakeFruitTopping,
    cakeFruitFillingInput,
    cakeFruitToppingInput,
  } = GlobalStore().cakeStore!
  //CUPCAKE STORE
  const {
    cupcakeSize,
    cupcakeAmount,
    cupcakeFlavorInput,
    cupcakeFrostingInput,
    cupcakeFillingInput,
    cupcakeFruitFilling,
    cupcakeFruitTopping,
    cupcakeFruitFillingInput,
    cupcakeFruitToppingInput,
  } = GlobalStore().cupcakeStore!
  // COOKIE STORE
  const {
    cookieSize,
    cookieAmount,
    cookieFillingInput,
    cookieFrostingInput,
    cookieFlavorInput,
    cookieFruitFilling,
    cookieFruitTopping,
    cookieFruitFillingInput,
    cookieFruitToppingInput,
  } = GlobalStore().cookieStore!

  const sendOrder = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setModal!(false)

    const templateParams = {
      // CONTACT PARAMS
      name: `${firstName!} ${lastName!}`,
      email: email!,
      phone: phone!,
      date: date!,
      deliveryOption: deliveryOption!.label,
      deliveryAddress: deliveryAddress!,
      occasion: occasion!,
      recipient: recipient!,
      colors: colors!,
      details: details!,
      // CAKE PARAMS
      cakeShape: cakeShape!.label,
      cakeTier: cakeTier!.label,
      cakeSize: cakeSize!.label,
      cakeFlavor: cakeFlavorInput!,
      cakeFrosting: cakeFrostingInput!,
      cakeFilling: cakeFillingInput!,
      cakeFruitFilling: `${
        cakeFruitFilling!.value === "other"
          ? cakeFruitFillingInput!
          : cakeFruitFilling!.label
      }`,
      cakeFruitTopping: `${
        cakeFruitTopping!.value === "other"
          ? cakeFruitToppingInput!
          : cakeFruitTopping!.label
      }`,
      // CUPCAKE PARAMS
      cupcakeSize: cupcakeSize!.label,
      cupcakeAmount: cupcakeAmount!.label,
      cupcakeFlavor: cupcakeFlavorInput!,
      cupcakeFrosting: cupcakeFrostingInput!,
      cupcakeFilling: cupcakeFillingInput!,
      cupcakeFruitFilling: `${
        cupcakeFruitFilling!.value === "other"
          ? cupcakeFruitFillingInput
          : cupcakeFruitFilling!.label
      }`,
      cupcakeFruitTopping: `${
        cupcakeFruitTopping!.value === "other"
          ? cupcakeFruitToppingInput
          : cupcakeFruitTopping!.label
      }`,
      // COOKIE PARAMS
      cookieSize: cookieSize!.label,
      cookieAmount: cookieAmount!.label,
      cookieFlavor: cookieFlavorInput!,
      cookieFrosting: cookieFrostingInput!,
      cookieFilling: cookieFillingInput!,
      cookieFruitFilling: `${
        cookieFruitFilling!.value === "other"
          ? cookieFruitFillingInput
          : cookieFruitFilling!.label
      }`,
      cookieFruitTopping: `${
        cookieFruitTopping!.value === "other"
          ? cookieFruitToppingInput
          : cookieFruitTopping!.label
      }`,
    }
    alert("Your Order Has Been Submitted!")

    // service id, template id, template params and public key to send order form to client
    emailjs
      .send(
        "service_xy138l8",
        "template_qtym3op",
        templateParams,
        "C0uERlxhef55UiLEd"
      )
      .then(
        function (response: any) {
          console.log("SUCCESS!", response.status, response.text)
        },
        function (error: any) {
          console.log("FAILED...", error)
        }
      )
  }
  if (!modal) {
    return <div></div>
  } else {
    return (
      <div className="modalOverlay">
        <div className="modal">
          <span>
            Are you sure your forms are completed and you want to submit them?
          </span>
          <div className="flex justify-evenly mt-10">
            <button onClick={(e) => sendOrder(e)} id="modal-btn">
              Submit Forms
            </button>
            <button onClick={() => setModal!(false)} id="modal-btn-2">
              Edit Forms
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
