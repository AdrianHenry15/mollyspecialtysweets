import React from "react";

const getContentItem = (title: string, content: string) => {
    return (
        <div className="flex flex-1 justify-between my-1">
            <h5 className="mr-2 font-semibold">{title}</h5>
            <p className="font-semibold">{content}</p>
        </div>
    );
};

const UserEstimates = () => {
    return (
        <div className="flex flex-col border-b-[1px] border-zinc-400">
            <div className="flex flex-col border-b-[1px] border-zinc-300">
                <h3 className="text-xl">Estimates</h3>
                <aside className="text-zinc-400 text-sm">A list of your fufilled estimates</aside>
            </div>
            {/* CONTENT */}
            <div className="flex text-sm flex-col my-2">
                {getContentItem("Estimate ID: ", "378298")}
                {getContentItem("Name: ", "Demo Title")}
                {getContentItem("Delivery Method: ", "Delivery")}
                {getContentItem("Delivery Date: ", "02/02/2020")}
                {getContentItem("Occasion: ", "Birthday Party")}
                {getContentItem("Colors: ", "Black and Yellow")}
            </div>
        </div>
    );
};

export default UserEstimates;
