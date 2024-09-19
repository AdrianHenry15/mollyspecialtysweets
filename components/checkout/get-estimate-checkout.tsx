import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import ConfirmationModal from "../modals/confirmation-modal";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useCartStore } from "@/stores/cart-store";
import { Loader } from "../loader";
import useDeliveryMethodStore from "@/stores/delivery-method-store";
import SuccessModal from "../modals/success-modal";
import dayjs from "dayjs";

interface IGetEstimateCheckoutProps {
    extraDetails: string;
}

const GetEstimateCheckout = (props: IGetEstimateCheckoutProps) => {
    // State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [estimateSuccess, setEstimateSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    // Store
    const { items } = useCartStore();
    const { total, subtotal, salesTax, deliveryFee } = useCartStore();
    const { deliveryAddress, deliveryMethod, orderDate } = useDeliveryMethodStore();

    // Clerk
    const { user } = useUser();

    // Values
    const orderTypes = items.map((item) => {
        return item.collection;
    });
    const productNames = items.map((item) => {
        return item.name;
    });
    const productPrices = items.map((item) => {
        return `$${item.price.toFixed(2)}`;
    });

    // EMAIL JS
    const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID as string;
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID as string;
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_KEY as string;

    const templateParams = {
        // Contact
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.primaryEmailAddress?.emailAddress || "",
        phone: user?.primaryPhoneNumber?.phoneNumber || "",
        // Order Details
        deliveryAddress,
        deliveryMethod,
        orderDate: dayjs(orderDate).format("MM/DD/YYYY"),
        orderTypes: orderTypes.join(", "),
        extraDetails: props.extraDetails,
        // Product Description
        productNames: productNames.join(", "),
        // Pricing
        // productPrices,
        // subtotal: `$${subtotal.toFixed(2)}`,
        // salesTax: `$${salesTax.toFixed(2)}`,
        // deliveryFee: `$${deliveryFee.toFixed(2)}`,
        // total: `$${total.toFixed(2)}`,
    };

    // Functions
    const onSubmit = (data: any) => {
        // open confirmation modal
        setIsModalOpen(true);
        console.log(data);

        // createCakeEstimate();
    };

    const confirmEstimate = () => {
        setLoading(true);

        // EMAIL JS
        emailjs.send(SERVICE_ID as string, TEMPLATE_ID as string, templateParams, PUBLIC_KEY as string).then(
            function (response) {
                toast.success("Your estimate has been submitted successfully!");
                console.log("SUCCESS!", response.status, response.text);
            },
            function (error) {
                toast.error("There was an error submitting your estimate. Please try again.");
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
            {estimateSuccess && (
                <SuccessModal
                    isOpen={false}
                    closeModal={function (): void {
                        throw new Error("Function not implemented.");
                    }}
                />
            )}
            <button
                onClick={onSubmit}
                className="flex items-center mt-40 justify-center text-white bg-blue-500 w-full self-center rounded-md py-2 font-semibold md:w-1/2"
            >
                {loading ? <Loader /> : "Get Estimate Now!"}
            </button>
        </div>
    );
};

export default GetEstimateCheckout;
