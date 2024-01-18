// utilityClasses.ts
const utilityClasses = {
    // Hide scrollbar for Chrome, Safari, and Opera
    "@layer utilities": {
        ".no-scrollbar::-webkit-scrollbar": {
            display: "none",
        },
        // Hide scrollbar for IE, Edge, and Firefox
        ".no-scrollbar": {
            "-ms-overflow-style": "none",
            scrollbarWidth: "none",
        },
    },
};

export default utilityClasses;
