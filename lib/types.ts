import { StaticImageData } from "next/image";
import { Collection } from "./constants";

export type NavMenuType = {
    title: string;
    link: string;
};

export type ProductType = {
    id: string;
    name: string;
    description: string;
    collection: Collection;
    price: number;
    quantity: number;
    image: string | StaticImageData;
};

export type CakeType = {
    shape: string;
    tier: string;
    size: string;
    flavor: string;
    frosting: string;
    filling: string;
    toppings?: string;
};

export type CupcakeType = {
    amount: string;
    size: string;
    flavor: string;
    frosting: string;
    filling?: string;
    toppings?: string;
};

export type CookieType = {
    amount: string;
    size: string;
    flavor: string;
    frosting?: string;
    filling?: string;
    toppings?: string;
};

export type ContactDetailsType = {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
};

export type OrderDetailsType = {
    delivery_method: string;
    delivery_date: string;
    occasion: string;
    colors?: string;
    details?: string;
};

export type UserType = {
    id: string;
    fullName: string;
    email: string;
    phoneNumber?: string;
    image: string;
    unsafeMetadata: {
        estimates: EstimateType[];
        receipts: ReceiptType[];
    };
};

export type EstimateType = {
    id: string;
    itemName: string;
    extraDetails: string;
    userId: string;
    fullName: string;
    primaryEmailAddress: string;
    primaryPhoneNumber?: string;
    createdAt?: string;
    updatedAt?: string;
};

export type ReceiptType = {
    id: string;
    itemName: string;
    extraDetails: string;
    price: string;
    userId: string;
    fullName: string;
    primaryEmailAddress: string;
    primaryPhoneNumber?: string;
    verified: boolean;
    createdAt?: string;
    updatedAt?: string;
};
