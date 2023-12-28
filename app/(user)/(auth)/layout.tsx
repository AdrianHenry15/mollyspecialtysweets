import "@/styles/globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    return <div className="w-full h-screen flex items-center justify-center">{children}</div>;
}
