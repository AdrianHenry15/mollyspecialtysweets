import BgImgContainer from "@/components/layout/home/BgImgContainer";
import Navbar from "@/components/layout/navbar";

export default function Home() {
    return (
        <div className="flex flex-col justify-between w-full">
            {/* <BgImgContainer singleImg /> */}
            <Navbar />
        </div>
    );
}
