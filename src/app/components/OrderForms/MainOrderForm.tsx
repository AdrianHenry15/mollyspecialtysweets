"use client"
import React from "react"
import Select from "react-select"
import CakeForm from "./CakeOrderForm"
import CupcakeForm from "./CupcakeOrderForm"
import CookieForm from "./CookieOrderForm"
import ContactForm from "./ContactForm"
import ContactReviewForm from "../ReviewForms/ContactReviewForm"
import CakeReviewForm from "../ReviewForms/CakeReviewForm"
import CupcakeReviewForm from "../ReviewForms/CupcakeReviewForm"
import CookieReviewForm from "../ReviewForms/CookieReviewForm"
import { useGlobalStore } from "../../stores/GlobalStore"

const OrderOptions = [
  { value: "cake", label: "Cake" },
  { value: "cupcakes", label: "Cupcakes" },
  { value: "cookies", label: "Cookies" },
]

const MainOrderForm = () => {
  const { orderType, setOrderType } = useGlobalStore().orderTypeStore!
  const { contactFormSubmit } = useGlobalStore().contactStore!
  const { cakeFormSubmit } = useGlobalStore().cakeStore!
  const { cupcakeFormSubmit } = useGlobalStore().cupcakeStore!
  const { cookieFormSubmit } = useGlobalStore().cookieStore!
  const { setModal } = useGlobalStore().modalStore!

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setModal!(true)
  }

  const renderContactForm = (): JSX.Element => {
    if (orderType!.some((selected: any) => selected.value !== "none")) {
      return !contactFormSubmit ? <ContactForm /> : <ContactReviewForm />
    } else {
      return <div></div>
    }
  }

  const renderCakeForm = (): JSX.Element => {
    if (orderType!.some((selected: any) => selected.value === "cake")) {
      return !cakeFormSubmit ? <CakeForm /> : <CakeReviewForm />
    } else {
      return <div></div>
    }
  }

  const renderCupcakeForm = (): JSX.Element => {
    if (orderType!.some((selected: any) => selected.value === "cupcakes")) {
      return !cupcakeFormSubmit ? <CupcakeForm /> : <CupcakeReviewForm />
    } else {
      return <div></div>
    }
  }

  const renderCookieForm = (): JSX.Element => {
    if (orderType!.some((selected: any) => selected.value === "cookies")) {
      return !cookieFormSubmit ? <CookieForm /> : <CookieReviewForm />
    } else {
      return <div></div>
    }
  }
  return (
    <section className="mt-20 flex-auto flex flex-col items-center">
      <div>
        {/* FORM ITEM 1 */}
        <div className="form-item">
          <span>What would you like to order?</span>
          <Select
            className="w-full"
            isMulti
            name="order-options"
            options={OrderOptions}
            onChange={(selected: any) => setOrderType!(selected)}
          />
        </div>
        {renderCakeForm()}
        {renderCupcakeForm()}
        {renderCookieForm()}
      </div>
      {renderContactForm()}
      {orderType!.some((selected: any) => selected.value !== "none") && (
        <button
          className="form-item"
          type="submit"
          onClick={(e) => handleSubmit(e)}>
          Finish Order
        </button>
      )}
    </section>
  )
}

export default MainOrderForm
