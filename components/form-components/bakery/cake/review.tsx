"use client";

import React from "react";
import ReviewItem from "../../review-item";

const CakeReview = () => {
    return (
        <div className="flex flex-col">
            <h1 className="text-center font-semibold text-2xl underline pb-4">Review</h1>
            <ReviewItem item="Cake Shape" value="Square" />
            <ReviewItem item="Cake Tier" value="Square" />
            <ReviewItem item="Cake Size" value="Square" />
            <ReviewItem item="Cake Flavor" value="Square" />
            <ReviewItem item="Cake Frosting" value="Square" />
            <ReviewItem item="Cake Filling" value="Square" />
            <ReviewItem item="Cake Toppings" value="Square" />
        </div>
    );
};

export default CakeReview;
