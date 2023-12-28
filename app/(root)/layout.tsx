import "@/styles/globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col">
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}
