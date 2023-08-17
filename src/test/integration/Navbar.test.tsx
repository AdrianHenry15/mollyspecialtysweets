import React from "react";
import Navbar from "@/app/components/Navbar";
import { expect, test, render } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";

test("renders Navbar component with correct text", () => {
    const { getByTestId } = render(<Navbar />);

    const navbarElement = getByTestId("navbar");
    const headerTextElement = getByTestId("app-header-text");

    expect(navbarElement).toBeInTheDocument();
    expect(headerTextElement).toHaveTextContent("Molly's Specialty Sweets");
});
