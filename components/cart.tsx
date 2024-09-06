"use client";

import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useCartStore } from "@/stores/cart-store";
import Link from "next/link";

export default function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const { items, removeItem, clearCart } = useCartStore();

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    // Calculate the total quantity of items in the cart
    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <>
            <button className="absolute right-6 lg:right-[2%] 2xl:right-[3.5%]" onClick={openCart} aria-label="Open cart">
                <div className="relative">
                    <ShoppingCartIcon
                        className="h-6 w-6 cursor-pointer text-black hover:scale-110 transition-transform ease-in-out duration-300"
                        aria-hidden="true"
                    />
                    {totalQuantity > 0 && (
                        <span className="absolute -top-2 -right-2 rounded-full bg-red-600 text-white text-xs font-bold p-[2px] px-[6px]">
                            {totalQuantity}
                        </span>
                    )}
                </div>
            </button>

            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeCart}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                    <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                                        <button
                                            type="button"
                                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                                            onClick={closeCart}
                                        >
                                            <span className="sr-only">Close</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Shopping Cart
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            {items.length > 0 ? (
                                                <ul>
                                                    {items.map((item) => (
                                                        <li key={item.id} className="flex justify-between py-2">
                                                            <span>
                                                                {item.name} (x{item.quantity})
                                                            </span>
                                                            <span>${item.price.toFixed(2)}</span>
                                                            <button className="text-red-500" onClick={() => removeItem(item.id)}>
                                                                Remove
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p>Your cart is empty.</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-3 sm:gap-3">
                                        <button
                                            type="button"
                                            className="inline-flex items-center w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none sm:text-sm"
                                            onClick={() => {
                                                clearCart();
                                                closeCart();
                                            }}
                                        >
                                            Clear Cart
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 sm:mt-0 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none sm:text-sm"
                                            onClick={closeCart}
                                        >
                                            Continue Shopping
                                        </button>
                                        <Link
                                            href="/checkout"
                                            className="mt-3 sm:mt-0 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none sm:text-sm"
                                            onClick={closeCart}
                                        >
                                            Checkout
                                        </Link>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}
