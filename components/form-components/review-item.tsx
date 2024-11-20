import React from "react";

interface IReviewFormProps {
    item: string;
    value: string;
}

const ReviewItem = (props: IReviewFormProps) => {
    return (
        <div className="flex">
            <h1 className="mr-2">{`${props.item}:`}</h1>
            <p>{props.value}</p>
        </div>
    );
};

export default ReviewItem;
