export type NavMenuType = {
    title: string;
    link: string;
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

export type EstimateType = {
    id: string;
    name: string;
    cake?: CakeType;
    cupcake?: CupcakeType;
    cookie?: CookieType;
    userId: string;
    userName?: string;
    email?: string;
    phone?: string;
    date: string;
};

export type ReceiptType = {
    id: string;
    price: string;
    userId: string;
    userName?: string;
    name: string;
    email?: string;
    phone?: string;
    date: string;
    verified: boolean;
};
