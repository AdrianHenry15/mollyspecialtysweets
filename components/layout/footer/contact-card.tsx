import Link from "next/link";
import React from "react";

const ContactCard = () => {
    return (
        <div className="flex flex-1 flex-col justify-start items-start w-full py-10 md:py-0 md:text-left">
            <div className="flex flex-col text-xs w-full flex-1">
                <Link href={"/contact-us"} className="font-light tracking-wider text-2xl pb-4">
                    Contact Us
                </Link>
                <div className="w-full">
                    <div className="flex flex-col text-gray-400">
                        <span className="pb-4">
                            <label className="text-white">Office: </label>
                            <Link className="hover:underline underline-offset-2" href="tel:4072424468">
                                (407) 242-4468
                            </Link>
                        </span>
                        <span className="pb-4">
                            <label className="text-white">Email: </label>
                            <Link className="hover:underline underline-offset-2" href="email:info@britellc.net">
                                mollyspecialtysweets@gmail.com
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactCard;
