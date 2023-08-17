import React from "react";

interface ReviewItemProps {
  label: string;
  value: string;
}

const ReviewItem = (props: ReviewItemProps) => {
  const { label, value } = props;
  return (
    <div className="review-item">
      <h2>{label}: </h2>
      <i>{value}</i>
    </div>
  );
};

export default ReviewItem;
