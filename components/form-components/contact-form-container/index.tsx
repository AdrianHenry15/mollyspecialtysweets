/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Image from "next/image"
import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useUser } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import emailjs from "@emailjs/browser"
import toast from "react-hot-toast"
import Form from "next/form"
import dayjs from "dayjs"

import Logo from "@/public/mollys-logo-black.png"

import Button from "../../buttons/button"
import ConfirmationModal from "../../modals/confirmation-modal"
import SuccessModal from "../../modals/success-modal"
import { Loader } from "../../loader"
import DeliveryMethod from "../delivery-method"
import FormItem from "../form-item"
import DatePickerInput from "../date-picker-input"
import { ChevronLeft } from "lucide-react"

const ContactFormContainer = () => {
  // SWITCH BETWEEN CONTACT AND ESTIMATE FORM | BOTH FORMS DO THE SAME THING FOR NOW
  const pathname = usePathname()
  // Clerk
  const { user } = useUser()

  const [step, setStep] = useState(1)
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)
  const [estimateSuccess, setEstimateSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  // EMAIL JS
  const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_KEY as string

  const {
    handleSubmit,
    getValues,
    // setValue,
    control,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phone: user?.primaryPhoneNumber?.phoneNumber || "",
      email: user?.primaryEmailAddress?.emailAddress || "",
      orderDate: "",
      deliveryMethod: "",
      deliveryAddress: "",
      extraDetails: "",
    },
  })

  //EMAIL JS
  const templateParams = {
    firstName: getValues("firstName"),
    lastName: getValues("lastName"),
    phone: getValues("phone"),
    email: getValues("email"),
    deliveryMethod: getValues("deliveryMethod"),
    deliveryAddress: getValues("deliveryAddress"),
    extraDetails: getValues("extraDetails"),
    orderDate: dayjs(getValues("orderDate")).format("MM/DD/YYYY"),
  }

  const onSubmit = (data?: any) => {
    // Trigger modal or other actions
    setIsConfirmationModalOpen(true)
  }

  const confirmEstimate = () => {
    // EMAIL JS
    emailjs
      .send(
        SERVICE_ID as string,
        TEMPLATE_ID as string,
        templateParams,
        PUBLIC_KEY as string
      )
      .then(
        function (response) {
          toast.success("You have successfully created an estimate!")
          console.log("SUCCESS!", response.status, response.text)
        },
        function (error) {
          console.log("FAILED...", error)
        }
      )

    // close modal
    setIsConfirmationModalOpen(false)
    setTimeout(() => {
      // open success modal
      setEstimateSuccess(true)
      setLoading(false)
    }, 1000)

    setLoading(true)
  }

  const handleNext = async () => {
    // Trigger validation for the specific fields required in this step
    const isValid = await trigger(["firstName", "lastName", "email", "phone"])

    // Proceed to next step only if validation is successful
    if (isValid) {
      setStep((prev) => prev + 1)
    } else {
      console.log("Validation failed for Contact Details")
    }
  }

  return (
    <section className="flex flex-col cursor items-center px-4 py-20 shadow-inner relative w-full">
      {isConfirmationModalOpen && (
        <ConfirmationModal
          title="Confirm Your Estimate Request"
          message="Confirm your Estimate Request and someone from our team will
                                    be in touch with you about your project"
          buttonText="Get Your Free Estimate"
          confirm={confirmEstimate}
          isOpen={isConfirmationModalOpen}
          closeModal={() => setIsConfirmationModalOpen(false)}
        />
      )}
      {estimateSuccess && (
        <SuccessModal
          isOpen={estimateSuccess}
          closeModal={() => setEstimateSuccess(false)}
        />
      )}
      {loading ? <Loader /> : null}

      {/* TITLE */}
      <h1 className="text-3xl mb-10 font-light animate-bounce">{`${
        pathname === "/contact" ? "Contact Us" : "Online Consultation"
      }`}</h1>

      {/* FORM CONTAINER */}
      <div className="flex flex-col w-full p-6 rounded-2xl shadow-pink-500 shadow-lg border-2 md:w-[650px] lg:w-[1000px]">
        {/* LOGO */}
        <div className="flex justify-center pb-4">
          <Image loading="eager" width={125} src={Logo} alt="logo" />
        </div>

        {/* FORM */}
        <Form
          action={""}
          className="self-center w-full md:w-2/3"
          onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <>
              <h1 className="font-semibold text-4xl underline text-center my-10">
                Contact Details
              </h1>
              <Controller
                control={control}
                name="firstName"
                rules={{ required: "First name is required" }}
                render={({ field }) => (
                  <div className="mb-4">
                    <label className="font-semibold text-xl">First Name:</label>
                    <input
                      {...field}
                      placeholder="First Name"
                      className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.firstName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.firstName && (
                      <span className="text-red-500 text-sm">
                        {errors.firstName.message || "First name is required"}
                      </span>
                    )}
                  </div>
                )}
              />
              <Controller
                control={control}
                name="lastName"
                rules={{ required: "Last name is required" }}
                render={({ field }) => (
                  <div className="mb-4">
                    <label className="font-semibold text-xl">Last Name:</label>
                    <input
                      {...field}
                      placeholder="Last Name"
                      className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.lastName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.lastName && (
                      <span className="text-red-500 text-sm">
                        {errors.lastName.message || "Last name is required"}
                      </span>
                    )}
                  </div>
                )}
              />
              <Controller
                control={control}
                name="phone"
                rules={{ required: "Phone is required" }}
                render={({ field }) => (
                  <div className="mb-4">
                    <label className="font-semibold text-xl">Phone:</label>
                    <input
                      {...field}
                      placeholder="Phone"
                      className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.phone && (
                      <span className="text-red-500 text-sm">
                        {errors.phone.message || "Phone is required"}
                      </span>
                    )}
                  </div>
                )}
              />
              <Controller
                control={control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email",
                  },
                }}
                render={({ field }) => (
                  <div className="mb-4">
                    <label className="font-semibold text-xl">Email:</label>
                    <input
                      {...field}
                      placeholder="Email"
                      className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-sm">
                        {errors.email.message || "Email is required"}
                      </span>
                    )}
                  </div>
                )}
              />
              <Button
                name="Next"
                onClick={handleNext} // Using handleNext for validation before proceeding
                className="w-full justify-center my-6"
              />
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="font-semibold text-4xl underline text-center my-10">
                Order Details
              </h1>

              {/* DELIVERY METHOD */}
              <DeliveryMethod errors={errors} control={control} />

              {/* DELIVERY ADDRESS */}
              {/* IF THERE IS A DELIVERY METHOD CHOSEN THAN SHOW THIS */}
              {watch("deliveryMethod") === "delivery" && (
                <Controller
                  control={control}
                  name="deliveryAddress"
                  render={({ field }) => (
                    <div className="mb-4 mx-10">
                      <label className="font-semibold text-xl">
                        Delivery Address
                      </label>
                      <input
                        {...field}
                        placeholder="Delivery Address"
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.deliveryAddress && (
                        <span className="text-red-500 text-sm">
                          {errors.deliveryAddress.message ||
                            "Address is required"}
                        </span>
                      )}
                    </div>
                  )}
                />
              )}

              {/* DELIVERY DATE */}
              <DatePickerInput control={control} errors={errors} />

              {/* DETAILS */}
              <Controller
                control={control}
                name="extraDetails"
                render={({ field }) => (
                  <div className="mb-4">
                    <label className="font-semibold text-xl">
                      Addition Details
                    </label>
                    <textarea
                      {...field}
                      placeholder="Additional Details"
                      className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                    {errors.extraDetails && (
                      <span className="text-red-500 text-sm">
                        {errors.extraDetails.message ||
                          "Extra details are required"}
                      </span>
                    )}
                  </div>
                )}
              />

              {/* BUTTON */}
              <div className={`my-10`}>
                {/* Back Btn */}
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center justify-center w-full mb-4">
                  <ChevronLeft />
                  <h5>Back to Contact Details</h5>
                </button>
                {/* Submit Btn */}
                <Button
                  onClick={() => onSubmit()}
                  name={`${pathname === "/contact" ? "Contact Us" : "Submit For Consultation"}`}
                  className={`w-full justify-center`}
                />
              </div>
            </>
          )}
        </Form>
      </div>
    </section>
  )
}

export default ContactFormContainer
