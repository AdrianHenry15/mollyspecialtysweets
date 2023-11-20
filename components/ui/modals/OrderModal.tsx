"use client";

import React, { useEffect, useRef } from "react";

import { IoMdClose } from "react-icons/io";
import { BsTruck, BsShop, BsMailbox, BsCreditCard2Back } from "react-icons/bs";
import { PiCallBell } from "react-icons/pi";

import ModalContainer from "./ModalContainer";

import { useOrderModalStore } from "@/hooks/useModal";
import OrderCard from "../OrderCard";

const OrderModal = () => {
    const { isOpen, closeModal } = useOrderModalStore();
    const modalRef = useRef<HTMLDivElement | null>(null);

    // if you click outside of the modal the modal closes
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                closeModal();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isOpen, closeModal]);

    if (isOpen) {
        return (
            <ModalContainer>
                {/* CONTAINER */}
                <div id="order-modal" ref={modalRef} className="flex flex-col w-full h-full justify-center items-center overflow-y-scroll">
                    <div className="flex flex-col bg-black border-white border-2 w-full h-full justify-center md:rounded-md md:w-[800px] md:h-[700px]">
                        {/* HEAD */}
                        <div className="w-full flex m-2">
                            <IoMdClose className="text-white" size={25} onClick={closeModal} />
                        </div>
                        <span className="font-bold text-2xl text-white self-center">Start Order</span>
                        {/* BODY  */}
                        <div className="flex flex-col mt-10 mb-4">
                            <OrderCard name="Delivery" description="Fresh ice cream delivered to you. What's better than that?">
                                <BsTruck size={40} />
                            </OrderCard>
                            <OrderCard name="Store Pickup" description="Pick up fresh ice cream at your favorite Taharka location.">
                                <BsShop size={40} />
                            </OrderCard>
                            <OrderCard name="Wholesale" description="Set a date for a wholesale order of 6+ pints of ice cream.">
                                <PiCallBell size={40} />
                            </OrderCard>
                            <OrderCard name="Gifts" description="Send a digital gift along with a friendly message.">
                                <BsCreditCard2Back size={40} />
                            </OrderCard>
                            <OrderCard name="Shipping" description="Fresh ice cream shipped to you Happy day!">
                                <BsMailbox size={40} />
                            </OrderCard>
                        </div>
                        <span className="text-zinc-500 text-center text-sm">Minimum of 6 pints for any delivery order</span>
                    </div>
                </div>
            </ModalContainer>
        );
    } else {
        return <div></div>;
    }
};

export default OrderModal;
