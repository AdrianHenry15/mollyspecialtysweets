import { CakeSizeAndServings, NavMenuType } from "./types";
export type Collection = "Cakes" | "Cupcakes" | "Cookies" | "Retail";

export const NavMenuItems: NavMenuType[] = [
    {
        title: "Home",
        link: "/",
    },
    // {
    //     title: "Signatures",
    //     link: "/signatures",
    // },
    // {
    //     title: "Event Planning",
    //     link: "/event-planning",
    // },
    {
        title: "Create A Cake",
        link: "/order/cakes",
    },
    {
        title: "Order Cupcakes",
        link: "/order/cupcakes",
    },
    {
        title: "Order Cookies",
        link: "/order/cookies",
    },
    // {
    //     title: "My Story",
    //     link: "/my-story",
    // },
    // {
    //     title: "Rewards",
    //     link: "/rewards",
    // },
];
export const NavMenuAltItems: NavMenuType[] = [
    {
        title: "Contact Us",
        link: "/contact-us",
    },
    {
        title: "Get Your Free Estimate",
        link: "/estimate",
    },
];

export const Occasions = [
    "Barbecue",
    "Bridal Shower",
    "New Year's Day",
    "Valentine's Day",
    "Easter",
    "Independence Day",
    "Thanksgiving",
    "Christmas",
    "Birthdays",
    "Anniversaries",
    "Graduations",
    "Weddings",
    "Engagements",
    "International Women's Day",
    "World Health Day",
    "Earth Day",
    "United Nations Day",
    "Family Reunions",
    "Baby Showers",
    "Gender Reveal Parties",
    "Graduation Ceremonies",
    "Award Ceremonies",
    "Super Bowl",
    "World Cup",
    "Olympics",
    "Memorial Day",
    "Veterans Day",
    "Groundhog Day",
    "April Fools' Day",
    "Labor Day",
];

export const CakeShapes = ["Round", "Sheet"];

export const RoundCakeSizes: CakeSizeAndServings[] = [
    { size: "4 in.", serves: "Serves 8" },
    { size: "6 in.", serves: "Serves 12" },
    { size: "8 in.", serves: "Serves 20" },
    { size: "9 in.", serves: "Serves 24" },
    { size: "10 in.", serves: "Serves 28" },
    { size: "12 in.", serves: "Serves 40" },
    { size: "14 in.", serves: "Serves 63" },
    { size: "16 in.", serves: "Serves 77" },
];

export const SheetCakeSizes: CakeSizeAndServings[] = [
    { size: "6 in.", serves: "Serves 12" },
    { size: "8 in.", serves: "Serves 20" },
    { size: "10 in.", serves: "Serves 30" },
    { size: "12 in.", serves: "Serves 48" },
    { size: "14 in.", serves: "Serves 63" },
];

export const Categories = ["Cakes", "Cookies", "Cupcakes"];

export const CakeTiers = ["Single", "Multiple"];

export const DeliveryOptions = ["Pickup", "Delivery"];

export const Amounts = ["4", "6", "12", "18", "24", "30", "36", "42", "48"];

export const MainCakeFlavors = [
    "Vanilla",
    "Milk Chocolate",
    "Dark Chocolate",
    "Chocolate Peanut Butter",
    "White Chocolate Raspberry",
    "Classic Red Velvet",
    "Classic Lemon",
    "Classic Carrot Cake",
    "Marble (Vanilla Chocolate Swirl)",
    "Angel Food Cake",
    "Confetti Cake",
    "Classic Spice Cake",
    "Strawberry",
    "Cookie Cake",
    "Other",
];

export const CakeFlavors = [
    // VANILLA
    "Classic Vanilla",
    "French Vanilla",
    "Vanilla Bean",
    "Vanilla Almond",
    "Vanilla Coconut",
    "Vanilla Citrus",
    "Vanilla Berry",
    "Vanilla Caramel",
    "Vanilla Chai",
    "Vanilla Lavender",
    "Vanilla Hazelnut",
    "Vanilla Pistachio",
    "Vanilla Mocha",
    "Vanilla Rose",
    "Vanilla Matcha",
    // CHOCOLATE
    "Classic Chocolate",
    "Dark Chocolate",
    "Milk Chocolate",
    "Double Chocolate",
    "Triple Chocolate",
    "Chocolate Fudge",
    "Chocolate Ganache",
    "Chocolate Mocha",
    "Chocolate Mint",
    "Chocolate Raspberry",
    "Chocolate Caramel",
    "Chocolate Peanut Butter",
    "Chocolate Hazelnut",
    "Chocolate Coconut",
    "White Chocolate Raspberry",
    "Mexican Chocolate",
    "Chocolate Orange",
    "Chocolate Espresso",
    "Chocolate Cherry",
    "Chocolate Almond",
    // RED VELVET
    "Classic Red Velvet",
    "Red Velvet Cheesecake",
    "Red Velvet Oreo",
    "Red Velvet Swirl",
    "Red Velvet Trifle",
    "Red Velvet Tiramisu",
    // LEMON
    "Classic Lemon",
    "Lemon Pound Cake",
    "Lemon Blueberry",
    "Lemon Poppy Seed",
    "Lemon Raspberry",
    "Lemon Chiffon",
    "Lemon Cream Cheese",
    "Lemon Drizzle",
    "Lemon Coconut",
    "Lemon Velvet",
    "Lemon Meringue",
    "Lemon Almond",
    "Lemon Olive Oil",
    "Lemon Yogurt",
    "Lemon Ricotta",
    "Lemon Rosemary",
    "Lemon Lavender",
    "Lemon White Chocolate",
    "Lemon Pistachio",
    "Lemon Elderflower",
    // CARROT
    "Classic Carrot Cake",
    "Carrot Pineapple Cake",
    "Carrot Walnut Cake",
    "Carrot Cream Cheese Cake",
    "Carrot Raisin Cake",
    "Carrot Apple Cake",
    "Carrot Ginger Cake",
    "Carrot Orange Cake",
    "Carrot Coconut Cake",
    "Carrot Pecan Cake",
    "Carrot Zucchini Cake",
    "Carrot Banana Cake",
    "Carrot Cardamom Cake",
    "Carrot Caramel Cake",
    "Carrot Honey Cake",
    "Carrot Almond Cake",
    "Carrot Cranberry Cake",
    "Carrot Maple Cake",
    "Carrot Pistachio Cake",
    "Carrot Chocolate Cake",
    // POUND CAKE
    "Classic Pound Cake",
    "Chocolate Pound Cake",
    "Vanilla Pound Cake",
    "Almond Pound Cake",
    "Marble Pound Cake",
    "Butter Pecan Pound Cake",
    "Coconut Pound Cake",
    "Blueberry Pound Cake",
    "Strawberry Pound Cake",
    "Lime Pound Cake",
    "Orange Pound Cake",
    "Raspberry Pound Cake",
    "Cherry Almond Pound Cake",
    "Key Lime Pound Cake",
    "Espresso Pound Cake",
    "Chocolate Chip Pound Cake",
    "Lemon Poppy Seed Pound Cake",
    "Brown Butter Pound Cake",
    // MARBLE
    "Classic Marble Cake",
    "Chocolate Vanilla Marble",
    "Chocolate Peanut Butter Marble",
    "Chocolate Mint Marble",
    "Chocolate Raspberry Marble",
    "Chocolate Orange Marble",
    "Chocolate Coconut Marble",
    "Chocolate Hazelnut Marble",
    "Chocolate Almond Marble",
    "Chocolate Strawberry Marble",
    "Chocolate Caramel Marble",
    "Chocolate Espresso Marble",
    "Chocolate Cherry Marble",
    "Chocolate Pistachio Marble",
    "Chocolate Mocha Marble",
    "Chocolate Banana Marble",
    "Chocolate Cream Cheese Marble",
    "Chocolate Walnut Marble",
    "Chocolate Pecan Marble",
    "Chocolate Tiramisu Marble",
    // ANGEL FOOD
    "Classic Angel Food",
    "Lemon Angel Food",
    "Chocolate Angel Food",
    "Vanilla Angel Food",
    "Almond Angel Food",
    "Coconut Angel Food",
    "Strawberry Angel Food",
    "Raspberry Angel Food",
    "Blueberry Angel Food",
    "Orange Angel Food",
    "Lime Angel Food",
    "Pineapple Angel Food",
    "Cherry Angel Food",
    "Peach Angel Food",
    "Mango Angel Food",
    "Lavender Angel Food",
    "Rosewater Angel Food",
    "Coffee Angel Food",
    "Caramel Angel Food",
    "Hazelnut Angel Food",
    //SPONGE
    "Classic Sponge Cake",
    "Lemon Sponge Cake",
    "Chocolate Sponge Cake",
    "Vanilla Sponge Cake",
    "Almond Sponge Cake",
    "Coconut Sponge Cake",
    "Orange Sponge Cake",
    "Lime Sponge Cake",
    "Strawberry Sponge Cake",
    "Raspberry Sponge Cake",
    "Blueberry Sponge Cake",
    "Pineapple Sponge Cake",
    "Cherry Sponge Cake",
    "Peach Sponge Cake",
    "Mango Sponge Cake",
    "Coffee Sponge Cake",
    "Matcha (Green Tea) Sponge Cake",
    "Hazelnut Sponge Cake",
    "Tiramisu Sponge Cake",
    "Caramel Sponge Cake",
    // ALMOND
    "Hazelnut Almond",
    // CONFETTI
    "Confetti Cake",
    // SPICE CAKE
    "Classic Spice Cake",
    "Ginger Spice Cake",
    "Pumpkin Spice Cake",
    "Apple Spice Cake",
    "Carrot Spice Cake",
    "Chai Spice Cake",
    "Cardamom Spice Cake",
    "Maple Spice Cake",
    "Honey Spice Cake",
    "Orange Spice Cake",
    // STRAWBERRY
    "Classic Strawberry Cake",
    "Strawberry Shortcake",
    "Strawberry Cheesecake",
    "Chocolate Covered Strawberry Cake",
    "Strawberry Lemonade Cake",
    "Fresh Strawberry Cake",
    "Strawberry Almond Cake",
    "Strawberry Cream Cake",
    "Strawberry Vanilla Cake",
    "Strawberry Coconut Cake",
    // RASPBERRY
    "Classic Raspberry Cake",
    "Raspberry Almond Cake",
    "Raspberry Chocolate Cake",
    "Raspberry Lemon Cake",
    "White Chocolate Raspberry Cake",
    "Raspberry Cheesecake",
    "Raspberry Coconut Cake",
    "Raspberry Pistachio Cake",
    "Raspberry Vanilla Cake",
    "Raspberry Red Velvet Cake",
    // BANANA
    "Classic Banana Cake",
    "Banana Nut Cake",
    "Chocolate Banana Cake",
    "Banana Foster Cake",
    "Banana Coconut Cake",
    "Banana Caramel Cake",
    "Hummingbird Cake (includes banana)",
    "Banana Chocolate Chip Cake",
    "Banana Split Cake",
    "Banana Pudding Cake",
    // CINNAMON
    "Cinnamon Roll Cake",
    "Apple Cinnamon Cake",
    "Cinnamon Spice Cake",
    "Cinnamon Chocolate Chip Cake",
    "Cinnamon Streusel Bundt Cake",
    "Cinnamon Applesauce Cake",
    "Cinnamon Honey Cake",
    "Pumpkin Cinnamon Streusel Cake",
    "Cinnamon Pecan Coffee Cake",
    // COFFEE
    "Cinnamon Swirl Coffee Cake",
    "Blueberry Coffee Cake",
    "Sour Cream Coffee Cake",
    "Streusel Coffee Cake",
    "Chocolate Chip Coffee Cake",
    "Raspberry Almond Coffee Cake",
    "Pumpkin Coffee Cake",
    "Apple Cinnamon Coffee Cake",
    "Banana Nut Coffee Cake",
    "Lemon Poppy Seed Coffee Cake",
    "Other",
];

export const CakeFrostings = [
    "None",
    "Buttercream Frosting",
    "Cream Cheese Frosting",
    "Chocolate Ganache",
    "Whipped Cream Frosting",
    "Fondant",
    "Royal Icing",
    "Marshmallow Frosting",
    "Ganache Frosting",
    "Meringue Frosting (Italian, Swiss, French)",
    "Boiled Icing",
    "Ermine Frosting",
    "Peanut Butter Frosting",
    "Coconut Cream Frosting",
    "Coffee Buttercream",
    "Maple Frosting",
    "Lemon Glaze",
    "Strawberry Frosting",
    "Caramel Frosting",
    "Mocha Frosting",
    "Cherry Frosting",
    "Other",
];
export const CakeFillings = [
    "Pastry Cream Filling",
    "Fruit Compote Filling",
    "Lemon Curd Filling",
    "Raspberry Jam Filling",
    "Chocolate Ganache Filling",
    "Whipped Cream Filling",
    "Cream Cheese Filling",
    "Custard Filling",
    "Strawberry Filling",
    "Blueberry Filling",
    "Cherry Filling",
    "Coconut Cream Filling",
    "Hazelnut Praline Filling",
    "Mango Puree Filling",
    "Peach Filling",
    "Pineapple Filling",
    "Salted Caramel Filling",
    "Almond Paste Filling",
    "Marshmallow Filling",
    "Maple Butter Filling",
    // ALL FRUITS
    "Strawberries",
    "Blueberries",
    "Raspberries",
    "Lemons",
    "Peaches",
    "Kiwi",
    "Mango",
    "Pineapple",
    "Cherries",
    "Oranges",
    "Mixed Berries",
    "Passion Fruit",
    "Cranberries",
    "Apples",
    "Bananas",
    "Blackberries",
    "Grapes",
    "Pears",
    "Plums",
    "Watermelon",
    "Other",
];
export const CakeToppings = [
    "Whipped Cream",
    "Fruit Slices",
    "Chocolate Shavings",
    "Candied Nuts",
    "Edible Flowers",
    "Caramel Drizzle",
    "Chocolate Sauce",
    "Powdered Sugar",
    "Sprinkles",
    "Chopped Nuts",
    "Toasted Coconut",
    "Fresh Berries",
    "Grated Lemon or Orange Zest",
    "Fondant Decorations",
    "Cookie Crumbs",
    "Crushed Candy Canes",
    "Edible Gold or Silver Leaf",
    "Meringue Kisses",
    "Candied Ginger",
    "Whipped Ganache",
    // ALL FRUITS
    "Strawberries",
    "Blueberries",
    "Raspberries",
    "Lemons",
    "Peaches",
    "Kiwi",
    "Mango",
    "Pineapple",
    "Cherries",
    "Oranges",
    "Mixed Berries",
    "Passion Fruit",
    "Cranberries",
    "Apples",
    "Bananas",
    "Blackberries",
    "Grapes",
    "Pears",
    "Plums",
    "Watermelon",
    "Other",
];
export const CookieFlavors = [
    "Chocolate Chip Cookies",
    "Oatmeal Raisin Cookies",
    "Peanut Butter Cookies",
    "Snickerdoodle Cookies",
    "Double Chocolate Cookies",
    "White Chocolate Macadamia Nut Cookies",
    "Sugar Cookies",
    "Gingerbread Cookies",
    "Shortbread Cookies",
    "M&M Cookies",
    "Coconut Macaroons",
    "Almond Butter Cookies",
    "Lemon Cookies",
    "Red Velvet Cookies",
    "Pumpkin Spice Cookies",
    "Cranberry Orange Cookies",
    "Maple Pecan Cookies",
    "Hazelnut Chocolate Chip Cookies",
    "Cherry Almond Cookies",
    "Butterscotch Cookies",
    "Other",
];
export const CookieFrostings = [
    "None",
    "Buttercream Frosting",
    "Royal Icing",
    "Glaze Icing",
    "Chocolate Ganache",
    "Cream Cheese Frosting",
    "Powdered Sugar Frosting",
    "Cookie Icing",
    "Fondant",
    "Marshmallow Frosting",
    "Peanut Butter Frosting",
    "Lemon Glaze",
    "Maple Glaze",
    "Coffee Icing",
    "Caramel Drizzle",
    "White Chocolate Drizzle",
    "Colored Icing",
    "Cinnamon Sugar",
    "Sprinkles",
    "Crushed Nuts",
    "Melted Chocolate",
    "Other",
];
export const CookieFillings = [
    "None",
    "Chocolate Ganache",
    "Fruit Jam (e.g., Raspberry, Strawberry)",
    "Lemon Curd",
    "Nutella",
    "Cream Cheese Filling",
    "Caramel",
    "Peanut Butter",
    "Marshmallow Fluff",
    "Dulce de Leche",
    "Cookie Butter",
    "Pumpkin Puree",
    "Almond Paste",
    "Fruit Compote",
    "Hazelnut Spread",
    "Maple Cream",
    "Cheesecake Filling",
    "Cinnamon Apple",
    "Coconut Cream",
    "Mint Chocolate",
    "Coffee Buttercream",
    // ALL FRUITS
    "Strawberries",
    "Blueberries",
    "Raspberries",
    "Lemons",
    "Peaches",
    "Kiwi",
    "Mango",
    "Pineapple",
    "Cherries",
    "Oranges",
    "Mixed Berries",
    "Passion Fruit",
    "Cranberries",
    "Apples",
    "Bananas",
    "Blackberries",
    "Grapes",
    "Pears",
    "Plums",
    "Watermelon",
    "Other",
];
export const CookieToppings = [
    "None",
    "Powdered Sugar",
    "Sprinkles",
    "Chopped Nuts",
    "Shredded Coconut",
    "Cocoa Powder",
    "Cinnamon Sugar",
    "Crushed Candy Canes",
    "Edible Glitter",
    "Chopped Chocolate",
    "Toasted Coconut",
    "Mini Chocolate Chips",
    "Candied Citrus Peel",
    "Crushed Oreo Cookies",
    "Melted Chocolate Drizzle",
    "Colored Sugar",
    "Nonpareils",
    "Candied Nuts",
    "Fruit Zest",
    "Dried Fruit Pieces",
    "Crushed Graham Crackers",
    // ALL FRUITS
    "Strawberries",
    "Blueberries",
    "Raspberries",
    "Lemons",
    "Peaches",
    "Kiwi",
    "Mango",
    "Pineapple",
    "Cherries",
    "Oranges",
    "Mixed Berries",
    "Passion Fruit",
    "Cranberries",
    "Apples",
    "Bananas",
    "Blackberries",
    "Grapes",
    "Pears",
    "Plums",
    "Watermelon",
    "Other",
];
export const CupcakeFlavors = [
    "Vanilla Cupcake",
    "Chocolate Cupcake",
    "Red Velvet Cupcake",
    "Lemon Cupcake",
    "Strawberry Cupcake",
    "Blueberry Cupcake",
    "Carrot Cupcake",
    "Coconut Cupcake",
    "Coffee Cupcake",
    "Peanut Butter Cupcake",
    "Banana Cupcake",
    "Raspberry Cupcake",
    "Mint Chocolate Cupcake",
    "Cookies and Cream Cupcake",
    "Caramel Cupcake",
    "Pumpkin Cupcake",
    "Orange Creamsicle Cupcake",
    "Chai Spice Cupcake",
    "Almond Cupcake",
    "Maple Cupcake",
    "Other",
];
export const CupcakeFrostings = [
    "None",
    "Buttercream Frosting",
    "Cream Cheese Frosting",
    "Chocolate Ganache",
    "Whipped Cream Frosting",
    "Royal Icing",
    "Fondant",
    "Marshmallow Frosting",
    "Meringue Frosting",
    "Peanut Butter Frosting",
    "Maple Frosting",
    "Lemon Glaze",
    "Caramel Frosting",
    "Coffee Buttercream",
    "Strawberry Frosting",
    "Coconut Cream Frosting",
    "Mint Buttercream",
    "Chocolate Cream Cheese Frosting",
    "Vanilla Bean Frosting",
    "Orange Buttercream",
    "Hazelnut Frosting",
    "Other",
];
export const CupcakeFillings = [
    "None",
    "Chocolate Ganache Filling",
    "Fruit Jam Filling (e.g., Raspberry, Strawberry)",
    "Cream Cheese Filling",
    "Lemon Curd Filling",
    "Caramel Filling",
    "Peanut Butter Filling",
    "Marshmallow Cream Filling",
    "Fruit Compote Filling",
    "Nutella Filling",
    "Cookie Dough Filling",
    "Coconut Cream Filling",
    "Raspberry Filling",
    "Custard Filling",
    "Chocolate Mousse Filling",
    "Cherry Pie Filling",
    "Coffee Cream Filling",
    "Maple Cream Filling",
    "Lime Curd Filling",
    "Blueberry Filling",
    "Orange Cream Filling",
    // ALL FRUITS
    "Strawberries",
    "Blueberries",
    "Raspberries",
    "Lemons",
    "Peaches",
    "Kiwi",
    "Mango",
    "Pineapple",
    "Cherries",
    "Oranges",
    "Mixed Berries",
    "Passion Fruit",
    "Cranberries",
    "Apples",
    "Bananas",
    "Blackberries",
    "Grapes",
    "Pears",
    "Plums",
    "Watermelon",
    "Other",
];
export const CupcakeToppings = [
    "None",
    "Sprinkles",
    "Chopped Nuts",
    "Shredded Coconut",
    "Cocoa Powder",
    "Powdered Sugar",
    "Edible Glitter",
    "Fruit Zest",
    "Candied Citrus Peel",
    "Chocolate Shavings",
    "Mini Chocolate Chips",
    "Crushed Candy Canes",
    "Colored Sugar",
    "Nonpareils",
    "Candied Nuts",
    "Fruit Slices",
    "Edible Flowers",
    "Toasted Coconut",
    "Cookie Crumbs",
    "Whipped Cream",
    "Cherry on Top",
    // ALL FRUITS
    "Strawberries",
    "Blueberries",
    "Raspberries",
    "Lemons",
    "Peaches",
    "Kiwi",
    "Mango",
    "Pineapple",
    "Cherries",
    "Oranges",
    "Mixed Berries",
    "Passion Fruit",
    "Cranberries",
    "Apples",
    "Bananas",
    "Blackberries",
    "Grapes",
    "Pears",
    "Plums",
    "Watermelon",
    "Other",
];
export const Fruits = [
    "Strawberries",
    "Blueberries",
    "Raspberries",
    "Lemons",
    "Peaches",
    "Kiwi",
    "Mango",
    "Pineapple",
    "Cherries",
    "Oranges",
    "Mixed Berries",
    "Passion Fruit",
    "Cranberries",
    "Apples",
    "Bananas",
    "Blackberries",
    "Grapes",
    "Pears",
    "Plums",
    "Watermelon",
    "Other",
];
