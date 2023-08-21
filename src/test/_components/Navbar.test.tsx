import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "@/src/app/_components/Navbar";

describe("Navbar", () => {
    it("Should render properly", () => {
        render(<Navbar />);

        const header = screen.getByRole("heading");
        const headerText = "Molly's Specialty Sweets";

        expect(header).toHaveTextContent(headerText);
    });
});
