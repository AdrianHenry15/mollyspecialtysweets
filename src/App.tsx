import React from "react";
import FormLayout from "./components/FormLayout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import OrderModal from "./components/modals/OrderModal";

const App = () => {
    return (
        <div className="flex flex-col h-full w-full items-center">
            <Navbar />
            <OrderModal />
            <FormLayout />
            <Footer />
        </div>
    );
};

export default App;
