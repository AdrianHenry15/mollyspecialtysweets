import React from "react";

import CakeForm from "@/components/forms/cake";
import PageFormContainer from "@/components/page-form-container";

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
