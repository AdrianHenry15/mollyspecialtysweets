/**
 * @jest-environment jsdom
 */

test("use jsdom in this test file", () => {
    const element = document.createElement("div");
    expect(element).not.toBeNull();
});

// import Navbar from "@/app/components/Navbar";
// import { render } from "@testing-library/react";

// test("renders Navbar with app header text", () => {
//     const { getByTestId } = render(<Navbar />);
//     const appHeaderText = getByTestId("app-header-test");
//     expect(appHeaderText).toHaveTextContent(`Molly's Specialty Sweets`);
// });

// test("Navbar has proper class and style", () => {
//     const { getByTestId } = render(<Navbar />);
//     const navbar = getByTestId("navbar");
//     expect(navbar).toHaveClass("mt-10 text-center sm:text-sm");
// });

// test("Navbar has correct ID for app header text", () => {
//     const { getByTestId } = render(<Navbar />);
//     const appHeaderText = getByTestId("app-header-test");
//     expect(appHeaderText).toHaveValue("id");
// });
