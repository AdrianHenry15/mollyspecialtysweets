import { Collection } from "./constants";
import { ProductType } from "./types";
// Cakes
import RedVelvetCake from "@/public/cake-splash.jpg";
import ChocolateCake from "@/public/chcolate-cake.jpg";
import CoconutCake from "@/public/coconut-cake.jpg";
import LemonCake from "@/public/lemon-cake.jpg";
import CustomCake from "@/public/custom-cake.jpg";
import StrawberryCake from "@/public/strawberry-cake.jpg";
import CarrotCake from "@/public/carrot-cake.jpg";
import CoffeeCake from "@/public/coffee-cake.jpg";
// Cupcakes
import VanillaCupcakeImage from "@/public/vanilla-cupcakes.jpg";
import CustomCupcakeImage from "@/public/custom-cupcakes.jpg";
import ChocolateCupcakeImage from "@/public/chocolate-cupcakes.jpg";
import RedVelvetCupcakeImage from "@/public/red-velvet-cupcakes.jpg";
import NakedStrawberryCupcakeImage from "@/public/naked-strawberry-cupcakes.jpg";
import PinkStrawberryCupcakeImage from "@/public/pink-strawberry-cupcakes.jpg";
import CarrotCupcakeImage from "@/public/carrot-cupcakes.jpg";
import MarbleCupcakeImage from "@/public/marble-cupcakes.jpg";
// Cookies
import PeanutButterCookieImage from "@/public/peanut-butter-cookies.jpg";
import OatmealRaisinCookieImage from "@/public/oatmeal-raisin-cookies.jpg";
import ChocolateChipCookieImage from "@/public/chocolate-chip-cookies.jpg";
import DoubleChocolateCookieImage from "@/public/double-chocolate-cookies.jpg";
import SugarCookieImage from "@/public/sugar-cookies.jpg";
import CustomCookieImage from "@/public/cookies-img.jpg";
import SnickerdoodleCookieImage from "@/public/snickerdoodle-cookies.jpg";

export const dummyCakes: ProductType[] = [
    // {
    //     id: "cake-1",
    //     name: "Custom Cake",
    //     collection: "Cakes" as Collection,
    //     price: 20.0,
    //     quantity: 1,
    //     image: CustomCake, // Ensure this path is correct
    //     description: "Bespoke cake with personalized flavor and design options.",
    // },
    {
        id: "cake-2",
        name: "Chocolate Cake",
        collection: "Cakes" as Collection,
        price: 15.0,
        quantity: 1,
        image: ChocolateCake, // Ensure this path is correct
        description: "Delicious 6 in. chocolate cake with rich cocoa flavor.",
    },
    {
        id: "cake-3",
        name: "Red Velvet Cake",
        collection: "Cakes" as Collection,
        price: 18.0,
        quantity: 1,
        image: RedVelvetCake, // Ensure this path is correct
        description: "Luxurious red velvet cake with a hint of cocoa and cream cheese frosting.",
    },
    {
        id: "cake-4",
        name: "Lemon Cake",
        collection: "Cakes" as Collection,
        price: 14.0,
        quantity: 1,
        image: LemonCake, // Ensure this path is correct
        description: "Zesty lemon cake with a refreshing citrus flavor.",
    },
    {
        id: "cake-5",
        name: "Carrot Cake",
        collection: "Cakes" as Collection,
        price: 16.0,
        quantity: 1,
        image: CarrotCake, // Ensure this path is correct
        description: "Spiced carrot cake with a touch of cinnamon and cream cheese frosting.",
    },
    {
        id: "cake-6",
        name: "Coconut Cake",
        collection: "Cakes" as Collection,
        price: 15.0,
        quantity: 1,
        image: CoconutCake, // Ensure this path is correct
        description: "Tropical coconut cake with a hint of sweetness and coconut flakes.",
    },
    {
        id: "cake-7",
        name: "Coffee Cake",
        collection: "Cakes" as Collection,
        price: 16.0,
        quantity: 1,
        image: CoffeeCake, // Ensure this path is correct
        description: "Rich coffee-flavored cake with a deep, aromatic taste.",
    },
    {
        id: "cake-8",
        name: "Strawberry Cake",
        collection: "Cakes" as Collection,
        price: 14.0,
        quantity: 1,
        image: StrawberryCake, // Ensure this path is correct
        description: "Fresh strawberry cake with a light and fruity flavor.",
    },
];

export const dummyCupcakes: ProductType[] = [
    // {
    //     id: "cupcake-0",
    //     name: "Custom Cupcake",
    //     collection: "Cupcakes" as Collection,
    //     price: 3.0,
    //     quantity: 1,
    //     image: CustomCupcakeImage, // Ensure this path is correct
    //     description:
    //         "Create your own perfect cupcake! Choose from a variety of flavors, frostings, and toppings to design a cupcake that’s uniquely yours.",
    // },
    {
        id: "cupcake-1",
        name: "Vanilla Cupcake",
        collection: "Cupcakes" as Collection,
        price: 3.0,
        quantity: 1,
        image: VanillaCupcakeImage, // Ensure this path is correct
        description: "Classic vanilla cupcake with a light and fluffy texture.",
    },
    {
        id: "cupcake-2",
        name: "Chocolate Cupcake",
        collection: "Cupcakes" as Collection,
        price: 3.0,
        quantity: 1,
        image: ChocolateCupcakeImage, // Ensure this path is correct
        description: "Rich and moist chocolate cupcake for chocolate lovers.",
    },
    {
        id: "cupcake-3",
        name: "Red Velvet Cupcake",
        collection: "Cupcakes" as Collection,
        price: 3.5,
        quantity: 1,
        image: RedVelvetCupcakeImage, // Ensure this path is correct
        description: "Velvety red cupcake with a hint of cocoa, topped with cream cheese frosting.",
    },
    {
        id: "cupcake-4",
        name: "Naked Strawberry Cupcake",
        collection: "Cupcakes" as Collection,
        price: 3.0,
        quantity: 1,
        image: NakedStrawberryCupcakeImage, // Ensure this path is correct
        description: "A fresh strawberry cupcake with no frosting, allowing the natural sweetness of the cake to shine through.",
    },

    {
        id: "cupcake-5",
        name: "Pink Strawberry Cupcake",
        collection: "Cupcakes" as Collection,
        price: 3.0,
        quantity: 1,
        image: PinkStrawberryCupcakeImage, // Ensure this path is correct
        description: "Sweet and fruity strawberry cupcake made with real strawberries.",
    },
    {
        id: "cupcake-6",
        name: "Carrot Cupcake",
        collection: "Cupcakes" as Collection,
        price: 3.5,
        quantity: 1,
        image: CarrotCupcakeImage, // Ensure this path is correct
        description: "Moist carrot cupcake spiced with cinnamon and topped with cream cheese frosting.",
    },

    {
        id: "cupcake-7",
        name: "Marble Cupcake",
        collection: "Cupcakes" as Collection,
        price: 3.5,
        quantity: 1,
        image: MarbleCupcakeImage, // Ensure this path is correct
        description: "Swirled chocolate and vanilla cupcake for the best of both worlds.",
    },
];

export const dummyCookies: ProductType[] = [
    // {
    //     id: "cookie-0",
    //     name: "Custom Cookie",
    //     collection: "Cookies" as Collection,
    //     price: 2.5,
    //     quantity: 1,
    //     image: CustomCookieImage, // Ensure this path is correct
    //     description:
    //         "Design your own cookie masterpiece! Choose from a variety of bases, mix-ins, and toppings to create a cookie that’s tailored to your taste. Perfect for any occasion.",
    // },
    {
        id: "cookie-1",
        name: "Chocolate Chip Cookie",
        collection: "Cookies" as Collection,
        price: 2.5,
        quantity: 1,
        image: ChocolateChipCookieImage, // Ensure this path is correct
        description: "A classic cookie packed with semi-sweet chocolate chips.",
    },
    {
        id: "cookie-2",
        name: "Sugar Cookie",
        collection: "Cookies" as Collection,
        price: 2.0,
        quantity: 1,
        image: SugarCookieImage, // Ensure this path is correct
        description: "Soft and chewy sugar cookie, sweet and simple.",
    },
    {
        id: "cookie-3",
        name: "Peanut Butter Cookie",
        collection: "Cookies" as Collection,
        price: 2.5,
        quantity: 1,
        image: PeanutButterCookieImage, // Ensure this path is correct
        description: "Rich peanut butter cookie with a soft texture and deep flavor.",
    },
    {
        id: "cookie-4",
        name: "Oatmeal Raisin Cookie",
        collection: "Cookies" as Collection,
        price: 2.5,
        quantity: 1,
        image: OatmealRaisinCookieImage, // Ensure this path is correct
        description: "Classic oatmeal cookie with a hint of cinnamon and sweet raisins.",
    },
    {
        id: "cookie-5",
        name: "Double Chocolate Cookie",
        collection: "Cookies" as Collection,
        price: 3.0,
        quantity: 1,
        image: DoubleChocolateCookieImage, // Ensure this path is correct
        description: "A rich, fudgy cookie with double the chocolate goodness.",
    },
    {
        id: "cookie-6",
        name: "Snickerdoodle Cookie",
        collection: "Cookies" as Collection,
        price: 2.5,
        quantity: 1,
        image: SnickerdoodleCookieImage, // Ensure this path is correct
        description: "Soft and buttery cookie rolled in cinnamon and sugar.",
    },
];
