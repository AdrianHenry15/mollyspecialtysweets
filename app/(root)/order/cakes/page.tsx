import React from "react";
import { Metadata } from "next";

import CakeForm from "@/components/forms/cake";

export const metadata: Metadata = {
    title: "Cakes",
    description: "Design your own cake",
};

const CakePage = () => {
    return <CakeForm />;
};

export default CakePage;
