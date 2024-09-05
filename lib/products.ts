import { Collection } from "./constants";
import ChocolateCake from "@/public/cake-img.jpg";
import RedVelvetCake from "@/public/cake-splash.jpg";
import CoconutCake from "@/public/coconut-cake.jpg";
import LemonCake from "@/public/lemon-cake.jpg";
import CustomCake from "@/public/custom-cake.jpg";
import StrawberryCake from "@/public/strawberry-cake.jpg";
import CarrotCake from "@/public/carrot-cake.jpg";
import CoffeeCake from "@/public/coffee-cake.jpg";

export const dummyCakes = [
    {
        id: "cake-1",
        name: "Custom Cake",
        collection: "Cakes" as Collection,
        price: 20.0,
        quantity: 1,
        image: CustomCake, // Ensure this path is correct
        description: "Bespoke cake with personalized flavor and design options.",
    },
    {
        id: "cake-2",
        name: "Chocolate Cake",
        collection: "Cakes" as Collection,
        price: 15.0,
        quantity: 1,
        image: ChocolateCake, // Ensure this path is correct
        description: "Delicious chocolate cake with rich cocoa flavor.",
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
