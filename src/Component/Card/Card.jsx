import React from "react";

const Card = (props) => {
  return (
    <div className="flex flex-col text-start gap-y-6 shadow-2xl shadow-red-200 p-2">
      <img src={props.img} alt="" className="size-20 ml-3" />
      <h4 className="text-xl font-bold">{props.title}</h4>
      <p className="text-gray-500 text-sm">{props.text}</p>
    </div>
  );
};

export default Card;
