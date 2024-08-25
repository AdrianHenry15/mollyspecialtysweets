import "@/styles/globals.css";

export default async function UserLayout({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-col w-full h-full">{children}</div>;
}
