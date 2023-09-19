import React from "react";
import FormLayout from "./components/FormLayout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import OrderModal from "./components/modals/OrderModal";
import useModalStore from "./hooks/useModalStore";
import LoginModal from "./components/modals/Login";
import SignUpModal from "./components/modals/Signup";
import CakeModal from "./components/modals/templates/Cake";
import CupcakeModal from "./components/modals/templates/Cupcake";
import CookieModal from "./components/modals/templates/Cookie";

const App = () => {
    const { orderModal, loginModal, signUpModal, cakeModal, cupcakeModal, cookieModal } = useModalStore();
    return (
        <div className="flex flex-col h-full w-full items-center">
            <Navbar />
            {!orderModal ? <div></div> : <OrderModal />}
            {!loginModal ? <div></div> : <LoginModal />}
            {!signUpModal ? <div></div> : <SignUpModal />}
            {!cakeModal ? <div></div> : <CakeModal />}
            {!cupcakeModal ? <div></div> : <CupcakeModal />}
            {!cookieModal ? <div></div> : <CookieModal />}
            <FormLayout />
            <Footer />
        </div>
    );
};

export default App;
