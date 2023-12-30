import "@/styles/globals.css";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-col self-center w-full md:w-[66%] lg:w-[50%] xl:w-[35%]">{children}</div>;
}
