import React from "react";
import FAQ from "./FAQ";

const RewardFAQs = () => {
    return (
        <section className="bg-zinc-300 flex flex-col w-full p-4 items-center">
            <div className="flex flex-col items-center md:w-6/12">
                <h1 className="font-bold text-4xl">FAQs</h1>
                <FAQ
                    q="How does your loyalty program work?"
                    a="Every purchase gets you closer to earning free cookies! 
                For every dollar you spend at Taharka Bros., 
                you earn 1 point. The one exception for this is catering orders--you earn 1 point for every $2 spent. 
                Once you have earned 100 points, you receive $10 in Cream Cash that can be used for in store, curbside, and local delivery orders."
                />
                <FAQ
                    q="How many Points do I need to get free stuff?"
                    a="Once you earn 100 points, 
                    they turn into $10 Cream Cash. 
                    Cream Cash can be used toward any in-store, curbside, or delivery order, 
                    it's like a gift card that you earned for yourself!"
                />
            </div>
        </section>
    );
};

export default RewardFAQs;
