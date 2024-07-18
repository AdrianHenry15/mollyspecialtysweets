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

export type User = {
    id: string;
    name: string;
    email?: string;
    phone?: string;
};

export type EstimateType = {
    id: string;
    name: string;
    user: User;
    date: string;
};

export type ReceiptType = {
    id: string;
    name: string;
    price: string;
    user: User;
    date: string;
    verified: boolean;
};
