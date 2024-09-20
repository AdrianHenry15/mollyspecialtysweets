import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PoweredBy from "@/components/layout/footer/powered-by";

// Mocking Next.js Link and Image components for the test environment
jest.mock("next/link", () => {
    return ({ children }: { children: React.ReactNode }) => children;
});

jest.mock("next/image", () => {
    const Image = (props: { src: string; alt: string; className: string }) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={props.src} alt={props.alt} className={props.className} />
    );
    Image.displayName = "NextImage"; // Adding display name to suppress ESLint warning
    return Image;
});
describe("PoweredBy Component", () => {
    it("renders Powered By text", () => {
        render(<PoweredBy />);
        const poweredByText = screen.getByText(/Powered By:/i);
        expect(poweredByText).toBeInTheDocument();
    });

    it("renders all the logo links with correct href attributes", () => {
        render(<PoweredBy />);

        // Clerk logo
        const clerkLink = screen.getByAltText(/clerk-logo/i).closest("a");
        expect(clerkLink).toBeInTheDocument();
        expect(clerkLink).toHaveAttribute("href", "https://clerk.com");

        // EmailJS logo
        const emailjsLink = screen.getByAltText(/emailjs-icon/i).closest("a");
        expect(emailjsLink).toBeInTheDocument();
        expect(emailjsLink).toHaveAttribute("href", "https://www.emailjs.com/");

        // Vercel icon
        const vercelLink = screen.getByRole("link", { name: /vercel/i });
        expect(vercelLink).toBeInTheDocument();
        expect(vercelLink).toHaveAttribute("href", "https://vercel.com/");

        // Next.js icon
        const nextjsLink = screen.getByRole("link", { name: /nextjs/i });
        expect(nextjsLink).toBeInTheDocument();
        expect(nextjsLink).toHaveAttribute("href", "https://nextjs.org/");

        // React.js icon
        const reactLink = screen.getByRole("link", { name: /reactjs/i });
        expect(reactLink).toBeInTheDocument();
        expect(reactLink).toHaveAttribute("href", "https://react.dev/");
    });

    it("applies hover transition classes to icons and images", () => {
        render(<PoweredBy />);

        // Check hover classes on Clerk Image
        const clerkImage = screen.getByAltText("clerk-logo");
        expect(clerkImage).toHaveClass("hover:scale-125 transition-all duration-300 ease-in-out");

        // Check hover classes on icons
        const vercelIcon = screen.getByRole("link", { name: /vercel/i }).firstChild;
        expect(vercelIcon).toHaveClass("hover:scale-125 transition-all duration-300 ease-in-out");

        const nextjsIcon = screen.getByRole("link", { name: /nextjs/i }).firstChild;
        expect(nextjsIcon).toHaveClass("hover:scale-125 transition-all duration-300 ease-in-out");

        const reactIcon = screen.getByRole("link", { name: /reactjs/i }).firstChild;
        expect(reactIcon).toHaveClass("hover:scale-125 transition-all duration-300 ease-in-out");
    });
});
