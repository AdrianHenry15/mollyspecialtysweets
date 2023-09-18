import React from "react";
import FormLayout from "./components/FormLayout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import OrderModal from "./components/modals/OrderModal";
import useModalStore from "./hooks/useModalStore";
import LoginModal from "./components/modals/Login";

const App = () => {
    const { orderModal } = useModalStore();
    return (
        <div className="flex flex-col h-full w-full items-center">
            <Navbar />
            {!orderModal ? <div></div> : <OrderModal />}
            {/* <LoginModal /> */}
            <FormLayout />
            <Footer />
        </div>
    );
};

export default App;
