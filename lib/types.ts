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
    cake?: CakeType;
    cupcake?: CupcakeType;
    cookie?: CookieType;
    date: string;
};

export type ReceiptType = {
    name: string;
    date: string;
    confirmed: boolean;
};
