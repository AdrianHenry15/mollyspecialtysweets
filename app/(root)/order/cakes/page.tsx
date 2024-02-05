import React from "react";

import CakeForm from "@/components/forms/cake";
import PageFormContainer from "@/components/page-form-container";
import Splash from "@/components/splash";

import Cake from "@/public/cake-img.jpg";

const CakePage = () => {
    return (
        <div>
            <PageFormContainer>
                <CakeForm />
            </PageFormContainer>
        </div>
    );
};

export default CakePage;
