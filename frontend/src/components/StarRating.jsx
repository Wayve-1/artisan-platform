import React from "react";

const StarRating = ({ note, max = 5 }) => {
  const fullStars = Math.floor(note);
  const halfStar = note % 1 >= 0.5;
  const emptyStars = max - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="stars">
      {"★".repeat(fullStars)}
      {halfStar && "☆"} {"☆".repeat(emptyStars)}
    </div>
  );
};

export default StarRating;
