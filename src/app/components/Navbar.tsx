import React from "react";

const Navbar = () => {
    return (
        <nav data-testid="navbar" className="mt-10 text-center sm:text-sm">
            <span data-testid="app-header-test" className="w-full text-center" id="app-header-text">{`Molly's Specialty Sweets`}</span>
        </nav>
    );
};

export default Navbar;
