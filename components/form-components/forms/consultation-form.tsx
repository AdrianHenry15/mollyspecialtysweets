/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Image from "next/image"
import React, { useState } from "react"
import {
  Controller,
  useForm,
  UseFormTrigger,
  FieldValues,
} from "react-hook-form"
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
import DatePickerInput from "../date-picker-input"
import { ChevronLeft } from "lucide-react"

const ConsultationForm = () => {
  // SWITCH BETWEEN CONTACT AND ESTIMATE FORM | BOTH FORMS DO THE SAME THING FOR NOW
  const pathname = usePathname()
  // Clerk
  const { user } = useUser()

  const [step, setStep] = useState(1)
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)
  const [consultationSuccess, setConsultationSuccess] = useState(false)
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
    ...getValues(),
    orderDate: dayjs(getValues("orderDate")).format("MM/DD/YYYY"),
  }

  const onSubmit = (data?: any) => {
    // Trigger modal or other actions
    setIsConfirmationModalOpen(true)
  }

  const confirmConsultation = () => {
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
          toast.success(
            "You have successfully created submitted for an online consultation!"
          )
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
      setConsultationSuccess(true)
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

  // Updated handleStep2Submit function
  const handleStep2Submit = async () => {
    // Trigger validation for the specific fields required in this step
    const isValid = await trigger(["deliveryMethod", "orderDate"])

    // Proceed to next step only if validation is successful
    if (isValid) {
      onSubmit()
    } else {
      toast.error("Please complete all required fields in Order Details.")
    }
  }

  const renderInputField = (
    name:
      | "firstName"
      | "lastName"
      | "email"
      | "phone"
      | "orderDate"
      | "deliveryMethod"
      | "deliveryAddress"
      | "extraDetails",
    label: string,
    placeholder: string,
    type = "text",
    validation?: any
  ) => (
    <Controller
      control={control}
      name={name}
      rules={validation}
      render={({ field }) => (
        <div className="mb-4">
          <label className="font-semibold text-xl">{label}:</label>
          <input
            {...field}
            placeholder={placeholder}
            type={type}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors[name] ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors[name] && (
            <span className="text-red-500 text-sm">
              {errors[name]?.message || `${label} is required`}
            </span>
          )}
        </div>
      )}
    />
  )
  return (
    <section className="flex flex-col cursor items-center px-4 py-20 shadow-inner relative w-full">
      {isConfirmationModalOpen && (
        <ConfirmationModal
          title="Confirm Your Online Consultation"
          message="Confirm your Online Consultation and someone from our team will
                                    be in touch with you about your project"
          buttonText="Get Your Online Consultation"
          confirm={confirmConsultation}
          isOpen={isConfirmationModalOpen}
          closeModal={() => setIsConfirmationModalOpen(false)}
        />
      )}
      {consultationSuccess && (
        <SuccessModal
          isOpen={consultationSuccess}
          closeModal={() => setConsultationSuccess(false)}
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
              {renderInputField(
                "firstName",
                "First Name",
                "First Name",
                "text",
                {
                  required: "First name is required",
                }
              )}
              {renderInputField("lastName", "Last Name", "Last Name", "text", {
                required: "Last name is required",
              })}
              {renderInputField("phone", "Phone", "Phone", "tel", {
                required: "Phone is required",
              })}
              {renderInputField("email", "Email", "Email", "email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email",
                },
              })}
              <Button
                name="Next"
                onClick={handleNext}
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
                      Additional Details
                    </label>
                    <textarea
                      {...field}
                      placeholder="Additional Details"
                      className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                )}
              />

              {/* BUTTON */}
              <div className={`my-10 w-full flex flex-col items-center`}>
                {/* Back Btn */}
                <button
                  onClick={() => setStep(1)}
                  className="flex px-10 py-1 items-center justify-center w-min whitespace-nowrap mb-4 hover:bg-zinc-300/50 rounded-lg ease-in-out transition-colors duration-500">
                  <ChevronLeft size={20} className="mr-4" />
                  <h5>Back to Contact Details</h5>
                </button>
                {/* Submit Btn */}
                <Button
                  onClick={handleStep2Submit}
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

export default ConsultationForm
