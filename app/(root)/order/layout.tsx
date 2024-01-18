import "@/styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col justify-center">
            <div className="flex flex-col self-center w-full md:w-[600px] lg:w-[650px] xl:w-[700px]">{children}</div>
        </div>
    );
}
