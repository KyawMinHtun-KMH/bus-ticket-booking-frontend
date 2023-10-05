import React from "react";

const Card = (props) => {
  return (
    <div className="container card mb-3 mt-3">
      <div className="card-body">{props.children}</div>
    </div>
  );
};

export default Card;
