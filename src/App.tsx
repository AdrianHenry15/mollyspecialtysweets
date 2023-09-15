import React from "react";
import FormLayout from "./components/FormLayout";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import Footer from "./components/Footer";

const App = () => {
    return (
        <div className="flex flex-col h-full w-full items-center">
            <Navbar />
            <Modal />
            <FormLayout />
            <Footer />
        </div>
    );
};

export default App;
