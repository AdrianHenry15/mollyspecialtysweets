import React from "react";

const Footer = () => {
    return (
        <footer className="bottom-0">
            <span>{`Molly's Specialty Sweets`}</span>
            <div className="pt-6">
                <span>Contact Molly: </span>
                <address>
                    <span>Phone: </span>
                    <a href="tel:407-242-4468">407-242-4468</a>
                </address>
                <address>
                    <span>Email: </span>
                    <a href="mailto:mograv123@gmail.com">mograv123@gmail.com</a>
                </address>
            </div>
        </footer>
    );
};

export default Footer;
