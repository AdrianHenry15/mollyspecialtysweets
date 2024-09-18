import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import ConfirmationModal from "../modals/confirmation-modal";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

const GetEstimateCheckout = () => {
    // State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [estimateSuccess, setEstimateSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    // CLERK
    const { user } = useUser();

    // EMAIL JS
    const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID as string;
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID as string;
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_KEY as string;

    const templateParams = {};

    // Functions
    const onSubmit = (data: any) => {
        // open confirmation modal
        setIsModalOpen(true);
        console.log(data);

        // createCakeEstimate();
    };

    const confirmEstimate = () => {
        // EMAIL JS
        emailjs.send(SERVICE_ID as string, TEMPLATE_ID as string, templateParams, PUBLIC_KEY as string).then(
            function (response) {
                toast.success("Your cake estimate has been submitted successfully!");
                console.log("SUCCESS!", response.status, response.text);
            },
            function (error) {
                toast.error("There was an error submitting your cake estimate. Please try again.");
                console.log("FAILED...", error);
            },
        );
        // POST REQUEST
        // crateCakeEstimate();
        // close modal
        setIsModalOpen(false);
        setTimeout(() => {
            // open success modal
            setEstimateSuccess(true);
            setLoading(false);
        }, 1000);

        setLoading(true);
    };
    return (
        <div className="flex items-center justify-center">
            {isModalOpen && (
                <ConfirmationModal
                    isOpen={isModalOpen}
                    title="Get Your Free Estimate"
                    buttonText="Confirm"
                    message="Confirm your estimate request for free today and someone from our team will get back to you as soon as possible"
                    closeModal={() => setIsModalOpen(false)}
                    confirm={confirmEstimate}
                />
            )}
            <button
                onClick={onSubmit}
                className="flex items-center mt-40 justify-center text-white bg-blue-500 w-full self-center rounded-md py-2 font-semibold md:w-1/2"
            >
                Get Estimate Now!
            </button>
        </div>
    );
};

export default GetEstimateCheckout;
