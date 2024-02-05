import CakeSplash from "@/public/cake-splash.jpg";
import ContactFormContainer from "@/components/forms/contact-form-container";
import Splash from "@/components/splash";

export default function HomePage() {
    return (
        <div className="flex flex-col justify-between w-full">
            {/* JUMBOTRON */}
            <Splash
                link1="/contact-us"
                link_title_1="Contact Us"
                link2="/estimate"
                link_title_2="Estimate"
                img={CakeSplash}
                title="Molly's Specialty Sweets"
                release_date="2024"
            />
            <ContactFormContainer />
        </div>
    );
}
