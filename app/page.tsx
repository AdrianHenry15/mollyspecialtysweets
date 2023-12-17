import IconsRow from "@/components/layout/icons-row";
import ImgLinkOverlay from "@/components/layout/home/img-link-overlay";
import Navbar from "@/components/layout/navbar";

export default function Home() {
    return (
        <div className="flex flex-col justify-between w-full">
            <Navbar />
            <ImgLinkOverlay />
            <IconsRow />
            <IconsRow />
            <IconsRow />
            <IconsRow />
        </div>
    );
}
