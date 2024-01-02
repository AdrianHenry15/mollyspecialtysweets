"use client";

import { CSSProperties } from "react";
import { PacmanLoader } from "react-spinners";

const override: CSSProperties = {
    display: "flex",
    margin: "0 auto",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
};

export const Loader = () => {
    return <PacmanLoader color="#ed47b0" size={20} cssOverride={override} />;
};
